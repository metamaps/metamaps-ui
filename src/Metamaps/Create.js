/* global $, Hogan, Bloodhound */

import DataFetcher from './DataFetcher'
import Map from './Map'
import Mouse from './Mouse'
import Selected from './Selected'
import Synapse from './Synapse'
import Topic from './Topic'
import Visualize from './Visualize'
import GlobalUI from './GlobalUI'

const Create = {
  isSwitchingSet: false, // indicates whether the metacode set switch lightbox is open
  selectedMetacodeSetIndex: null,
  customMetacodes: [],
  init: function(serverData) {
    var self = Create
    const mapper = serverData.ActiveMapper
    const metacodeSets = serverData.metacodeSets
    const selectedSet = mapper &&
      mapper.metacodes[0].includes('metacodeset')
      ? mapper.metacodes[0].replace('metacodeset-', '')
      : 'custom'
    if (selectedSet === 'custom') {
      // "all" is not a metacode set we can pick from, so subtract it
      self.selectedMetacodeSetIndex = metacodeSets.length - 1
    } else {
      let setIndex
      metacodeSets.forEach((set, index) => {
        if (set.id === selectedSet || set.id === parseInt(selectedSet, 10)) {
          setIndex = index
        }
      })
      self.selectedMetacodeSetIndex = setIndex
    }
  },
  setupMetacodeSetTabs: function() {
    // // SWITCHING METACODE SETS
    $('#metacodeSwitchTabs').tabs({
      active: Create.selectedMetacodeSetIndex
    }).addClass('ui-tabs-vertical ui-helper-clearfix')
    $('#metacodeSwitchTabs .ui-tabs-nav li').removeClass('ui-corner-top').addClass('ui-corner-left')
  },
  updateMetacodeSet: function(set, index, custom, ids) {
    Create.selectedMetacodeSetIndex = index
    const metacodeModels = new DataModel.MetacodeCollection()
    ids.forEach(id => {
      metacodeModels.add(DataModel.Metacodes.get(id))
    })
    // sort by name
    metacodeModels.sort()

    // send list of 'custom' ids or the name of the set
    const value = custom ? ids.toString() : `metacodeset-${set}`
    DataFetcher.changeMetacodeSet(value)
      .catch(() => GlobalUI.notifyUser('There was an error saving your metacodes'))

    $('#metacodeImg, #metacodeImgTitle').empty()
    $('#metacodeImg').removeData('cloudcarousel')
    var newMetacodes = ''
    metacodeModels.each(function(metacode) {
      newMetacodes += '<img class="cloudcarousel" width="40" height="40" src="' + metacode.get('icon') + '" data-id="' + metacode.id + '" title="' + metacode.get('name') + '" alt="' + metacode.get('name') + '"/>'
    })

    $('#metacodeImg').empty().append(newMetacodes).CloudCarousel({
      titleBox: $('#metacodeImgTitle'),
      yRadius: 40,
      xRadius: 190,
      xPos: 170,
      yPos: 40,
      speed: 0.3,
      mouseWheel: true,
      bringToFront: true
    })

    GlobalUI.closeLightbox()
    $('#topic_name').focus()
  },
  cancelMetacodeSetSwitch: function() {
    var self = Create
    self.isSwitchingSet = false
    $('#metacodeSwitchTabs').tabs(
      'option',
      'active',
      self.selectedMetacodeSetIndex
    )
    $('#topic_name').focus()
  },
  newTopic: {
    init: function() {
      $('#topic_name').keyup(function(e) {
        const ESC = 27

        if (e.keyCode === ESC) {
          Create.newTopic.hide()
        } // if

        Create.newTopic.name = $(this).val()
      })

      // TODO: move this callback def into react
      $('.pinCarousel').click(function() {
        if (Create.newTopic.pinned) {
          $('.pinCarousel').removeClass('isPinned')
          Create.newTopic.pinned = false
        } else {
          $('.pinCarousel').addClass('isPinned')
          Create.newTopic.pinned = true
        }
      })

      var topicBloodhound = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
          url: '/topics/autocomplete_topic?term=%QUERY',
          wildcard: '%QUERY'
        }
      })

      // initialize the autocomplete results for the metacode spinner
      $('#topic_name').typeahead(
        {
          highlight: true,
          minLength: 2
        },
        [{
          name: 'topic_autocomplete',
          limit: 8,
          display: function(s) { return s.label },
          templates: {
            suggestion: function(s) {
              return Hogan.compile($('#topicAutocompleteTemplate').html()).render(s)
            }
          },
          source: topicBloodhound
        }]
      )

      // tell the autocomplete to submit the form with the topic you clicked on if you pick from the autocomplete
      $('#topic_name').bind('typeahead:select', function(event, datum, dataset) {
        Create.newTopic.beingCreated = false
        if (datum.rtype === 'topic') {
          Topic.getTopicFromAutocomplete(datum.id)
        } else if (datum.rtype === 'map') {
          Topic.getMapFromAutocomplete({
            id: datum.id,
            name: datum.label
          })
        }
      })

      // initialize metacode spinner and then hide it
      $('#metacodeImg').CloudCarousel({
        titleBox: $('#metacodeImgTitle'),
        yRadius: 40,
        xRadius: 190,
        xPos: 170,
        yPos: 40,
        speed: 0.3,
        mouseWheel: true,
        bringToFront: true
      })
      $('.new_topic').hide()
      $('#new_topic').attr('oncontextmenu', 'return false') // prevents the mouse up event from opening the default context menu on this element
    },
    name: null,
    newId: 1,
    beingCreated: false,
    metacode: null,
    x: null,
    y: null,
    addSynapse: false,
    pinned: false,
    open: function() {
      $('#new_topic').fadeIn('fast', function() {
        $('#topic_name').focus()
      })
      Create.newTopic.beingCreated = true
      Create.newTopic.name = ''
      Map.setHasLearnedTopicCreation(true)
    },
    hide: function(force) {
      if (force || !Create.newTopic.pinned) {
        $('#new_topic').fadeOut('fast')
      }
      if (force) {
        $('.pinCarousel').removeClass('isPinned')
        Create.newTopic.pinned = false
      }
      if (DataModel.Topics.length === 0) {
        Map.setHasLearnedTopicCreation(false)
      }
      Create.newTopic.beingCreated = false
    },
    reset: function() {
      $('#topic_name').typeahead('val', '')
    }
  },
  newSynapse: {
    init: function() {
      var synapseBloodhound = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
          url: '/search/synapses?term=%QUERY',
          wildcard: '%QUERY'
        }
      })
      var existingSynapseBloodhound = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
          url: '/search/synapses?topic1id=%TOPIC1&topic2id=%TOPIC2',
          prepare: function(query, settings) {
            var self = Create.newSynapse
            if (Selected.Nodes.length < 2 && self.topic1id && self.topic2id) {
              settings.url = settings.url.replace('%TOPIC1', self.topic1id).replace('%TOPIC2', self.topic2id)
              return settings
            } else {
              return null
            }
          }
        }
      })

      // initialize the autocomplete results for synapse creation
      $('#synapse_desc').typeahead(
        {
          highlight: true,
          minLength: 2
        },
        [{
          name: 'synapse_autocomplete',
          display: function(s) { return s.label },
          templates: {
            suggestion: function(s) {
              return Hogan.compile("<div class='genericSynapseDesc'>{{label}}</div>").render(s)
            }
          },
          source: synapseBloodhound
        },
        {
          name: 'existing_synapses',
          limit: 50,
          display: function(s) { return s.label },
          templates: {
            suggestion: function(s) {
              return Hogan.compile($('#synapseAutocompleteTemplate').html()).render(s)
            },
            header: '<h3>Existing synapses</h3>'
          },
          source: existingSynapseBloodhound
        }]
      )

      $('#synapse_desc').keyup(function(e) {
        const ESC = 27

        if (e.keyCode === ESC) {
          Create.newSynapse.hide()
        } // if

        Create.newSynapse.description = $(this).val()
      })

      $('#synapse_desc').focusout(function() {
        if (Create.newSynapse.beingCreated) {
          Synapse.createSynapseLocally()
        }
      })

      $('#synapse_desc').keydown(function(e) {
        const TAB = 9
        if (Create.newSynapse.beingCreated && e.keyCode === TAB) {
          e.preventDefault()
          Synapse.createSynapseLocally()
        }
      })

      $('#synapse_desc').bind('typeahead:select', function(event, datum, dataset) {
        if (datum.id) { // if they clicked on an existing synapse get it
          Synapse.getSynapseFromAutocomplete(datum.id)
        } else {
          Create.newSynapse.description = datum.value
          Synapse.createSynapseLocally()
        }
      })
    },
    beingCreated: false,
    description: null,
    topic1id: null,
    topic2id: null,
    newSynapseId: null,
    open: function() {
      $('#new_synapse').fadeIn(100, function() {
        $('#synapse_desc').focus()
      })
      Create.newSynapse.beingCreated = true
    },
    hide: function() {
      $('#new_synapse').fadeOut('fast')
      $('#synapse_desc').typeahead('val', '')
      Create.newSynapse.beingCreated = false
      Create.newTopic.addSynapse = false
      Create.newSynapse.topic1id = 0
      Create.newSynapse.topic2id = 0
      Mouse.synapseStartCoordinates = []
      if (Visualize.mGraph) Visualize.mGraph.plot()
    }
  }
}

export default Create
