/* global $, Hogan, Bloodhound, Countable */

import GlobalUI, { ReactApp } from '../GlobalUI'

const InfoBox = {
  isOpen: false,
  init: function(serverData, store) {
    InfoBox.store = store
    const querystring = window.location.search.replace(/^\?/, '')
    if (querystring === 'new') {
      InfoBox.store.dispatch(updateIsNewMap(true))
      InfoBox.open()
    }
  },
  toggleBox: function(which) {
    if (InfoBox.isOpen || which === 'close') InfoBox.close()
    else if (!InfoBox.isOpen || which === 'open') InfoBox.open()
  },
  open: function() {
    $('.mapInfoIcon div').addClass('hide')
    $('.mapInfoBox').fadeIn(200, function() {
      InfoBox.isOpen = true
    })
  },
  close: function() {
    $('.mapInfoIcon div').removeClass('hide')
    $('.mapInfoBox').fadeOut(200, function() {
      InfoBox.isOpen = false
    })
  },
  attachEventListeners: function(map, mapper) {
    $('.mapInfoBox.canEdit .best_in_place').best_in_place()
    // because anyone who can edit the map can change the map title
    var bipName = $('.mapInfoBox .best_in_place_name')
    bipName.unbind('best_in_place:activate').bind('best_in_place:activate', function() {
      var $el = bipName.find('textarea')
      var el = $el[0]

      $el.attr('maxlength', '140')

      $('.mapInfoName').append('<div class="nameCounter forMap"></div>')

      var callback = function(data) {
        $('.nameCounter.forMap').html(data.all + '/140')
      }
      Countable.live(el, callback)
    })
    bipName.unbind('best_in_place:deactivate').bind('best_in_place:deactivate', function() {
      $('.nameCounter.forMap').remove()
    })
    $('.mapInfoName .best_in_place_name').unbind('ajax:success').bind('ajax:success', function() {
      const name = $(this).html()
      // mobile menu
      // update mobile menu?
      InfoBox.store.dispatch(updateIsNewMap(false))
      document.title = `${name} | Metamaps`
      window.history.replaceState('', `${name} | Metamaps`, window.location.pathname)
      map.set('name', name)
      map.trigger('saved')
      // TODO: check if this updates the view
    })
    $('.mapInfoDesc .best_in_place_desc').unbind('ajax:success').bind('ajax:success', function() {
      var desc = $(this).html()
      map.set('desc', desc)
      map.trigger('saved')
      // TODO: check if this updates the view
    })
    $('.mapInfoDesc .best_in_place_desc, .mapInfoName .best_in_place_name').unbind('keypress').keypress(function(e) {
      const ENTER = 13
      if (e.which === ENTER) {
        $(this).data('bestInPlaceEditor').update()
      }
    })
    InfoBox.addTypeahead(map, mapper)
  },
  addTypeahead: function(map, mapper) {
    // for autocomplete
    var collaborators = {
      name: 'collaborators',
      limit: 9999,
      display: function(s) { return s.label },
      templates: {
        notFound: function(s) {
          return Hogan.compile($('#collaboratorSearchTemplate').html()).render({
            value: 'No results',
            label: 'No results',
            rtype: 'noresult',
            profile: '/images/user.png'
          })
        },
        suggestion: function(s) {
          return Hogan.compile($('#collaboratorSearchTemplate').html()).render(s)
        }
      },
      source: new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
          url: '/search/mappers?term=%QUERY',
          wildcard: '%QUERY'
        }
      })
    }

    // for adding map collaborators, who will have edit rights
    if (mapper && mapper.id === map.get('user_id')) {
      $('.collaboratorSearchField').typeahead(
        {
          highlight: false
        },
        [collaborators]
      )
      $('.collaboratorSearchField').bind('typeahead:select', function(event, item) {
        InfoBox.addCollaborator(map, item.id)
        $('.collaboratorSearchField').typeahead('val', '')
      })
    }
  },
  removeCollaborator: function(map, collaboratorId) {
    DataModel.Collaborators.remove(DataModel.Collaborators.get(collaboratorId))
    var mapperIds = DataModel.Collaborators.models.map(function(mapper) { return mapper.id })
    $.post('/maps/' + map.id + '/access', { access: mapperIds })
    // TODO: check if this updates the view
  },
  addCollaborator: function(map, newCollaboratorId) {
    if (DataModel.Collaborators.get(newCollaboratorId)) {
      GlobalUI.notifyUser('That user already has access')
      return
    }
    function callback(mapper) {
      // TODO: check if this updates the view
      DataModel.Collaborators.add(mapper)
      const mapperIds = DataModel.Collaborators.models.map(function(mapper) { return mapper.id })
      $.post('/maps/' + map.id + '/access', { access: mapperIds })
      const name = DataModel.Collaborators.get(newCollaboratorId).get('name')
      GlobalUI.notifyUser(name + ' will be notified')
    }
    $.getJSON('/users/' + newCollaboratorId + '.json', callback)
  },
  selectPermission: function(map, permission) {
    // TODO: check if this updates the view
    map.save({
      permission: permission
    })
    // map.updateMapWrapper()
  },
  deleteActiveMap: function(map, mapper) {
    let confirmString = 'Are you sure you want to delete this map? '
    confirmString += 'This action is irreversible. It will not delete the topics and synapses on the map.'

    const doIt = window.confirm(confirmString)
    const authorized = map.authorizePermissionChange(mapper)

    if (doIt && authorized) {
      InfoBox.close()
      DataModel.Maps.Active.remove(map)
      DataModel.Maps.Featured.remove(map)
      DataModel.Maps.Mine.remove(map)
      DataModel.Maps.Shared.remove(map)
      map.destroy()
      ReactApp.history.push('/')
      GlobalUI.notifyUser('Map eliminated')
    } else if (!authorized) {
      window.alert("Hey now. We can't just go around willy nilly deleting other people's maps now can we? Run off and find something constructive to do, eh?")
    }
  }
}

export default InfoBox
