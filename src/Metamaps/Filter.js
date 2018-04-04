/* global $ */

import _ from 'lodash'

import Active from './Active'
import Control from './Control'
import DataModel from './DataModel'
import Settings from './Settings'
import Visualize from './Visualize'

import {
  updateAllForFiltering,
  updateFilterData,
  updateVisibleForFiltering
} from '../actions'

const Filter = {
  init: function(serverData, store) {
    Filter.store = store
  },
  reset: function() {
    Filter.store.dispatch(updateAllForFiltering({
      metacodes: [],
      mappers: [],
      synapses: []
    }))
    Filter.store.dispatch(updateVisibleForFiltering({
      metacodes: [],
      mappers: [],
      synapses: []
    }))
    Filter.store.dispatch(updateFilterData({
      metacodes: {},
      mappers: {},
      synapses: {}
    }))
  },
  // an abstraction function for checkMetacodes, checkMappers, checkSynapses to reduce
  // code redundancy
  updateFilters: function(collection, propertyToCheck, correlatedModel, filtersToUse, listToModify) {
    let newList = []
    // the first option enables us to accept
    // ['Topics', 'Synapses'] as 'collection'
    if (typeof collection === 'object') {
      DataModel[collection[0]].each(function(model) {
        let prop = model.get(propertyToCheck)
        if (prop !== null) {
          prop = prop.toString()
          if (newList.indexOf(prop) === -1) {
            newList.push(prop)
          }
        }
      })
      DataModel[collection[1]].each(function(model) {
        let prop = model.get(propertyToCheck)
        if (prop !== null) {
          prop = prop.toString()
          if (newList.indexOf(prop) === -1) {
            newList.push(prop)
          }
        }
      })
    } else if (typeof collection === 'string') {
      DataModel[collection].each(function(model) {
        let prop = model.get(propertyToCheck)
        if (prop !== null) {
          prop = prop.toString()
          if (newList.indexOf(prop) === -1) {
            newList.push(prop)
          }
        }
      })
    }
    const { allForFiltering, filterData, visibleForFiltering } = Filter.store.getState()
    const newFilterDataObj = Object.assign({}, filterData[filtersToUse])
    const newVisibleList = Array.from(visibleForFiltering[filtersToUse])

    const removed = _.difference(allForFiltering[filtersToUse], newList)
    const added = _.difference(newList, allForFiltering[filtersToUse])
    _.each(removed, function(identifier) {
      const index = newVisibleList.indexOf(identifier)
      newVisibleList.splice(index, 1)
      delete newFilterDataObj[identifier]
    })
    _.each(added, function(identifier) {
      const model = DataModel[correlatedModel].get(identifier) ||
      DataModel[correlatedModel].find(function(m) {
        return m.get(propertyToCheck) === identifier
      })
      newFilterDataObj[identifier] = model.prepareDataForFilter()
      newVisibleList.push(identifier)
    })
    const newFilterData = Object.assign({}, filterData, { [filtersToUse]: newFilterDataObj })
    const newVisible = Object.assign({}, visibleForFiltering, { [filtersToUse]: newVisibleList })
    const newAll = Object.assign({}, allForFiltering, { [filtersToUse]: newList })
    Filter.store.dispatch(updateAllForFiltering(newAll))
    Filter.store.dispatch(updateFilterData(newFilterData))
    Filter.store.dispatch(updateVisibleForFiltering(newVisible))
  },
  checkMetacodes: function() {
    Filter.updateFilters('Topics', 'metacode_id', 'Metacodes', 'metacodes', 'metacode')
  },
  checkMappers: function() {
    if (Active.Map) {
      Filter.updateFilters('Mappings', 'user_id', 'Mappers', 'mappers', 'mapper')
    } else {
      // on topic view
      Filter.updateFilters(['Topics', 'Synapses'], 'user_id', 'Creators', 'mappers', 'mapper')
    }
  },
  checkSynapses: function() {
    Filter.updateFilters('Synapses', 'desc', 'Synapses', 'synapses', 'synapse')
  },
  filterAllMetacodes: function(toVisible) {
    const { allForFiltering, visibleForFiltering } = Filter.store.getState()
    const metacodes = toVisible ? Array.from(allForFiltering.metacodes) : []
    const newVisible = Object.assign({}, visibleForFiltering, { metacodes })
    Filter.store.dispatch(updateVisibleForFiltering(newVisible))
    Filter.passFilters()
  },
  filterAllMappers: function(toVisible) {
    const { allForFiltering, visibleForFiltering } = Filter.store.getState()
    const mappers = toVisible ? Array.from(allForFiltering.mappers) : []
    const newVisible = Object.assign({}, visibleForFiltering, { mappers })
    Filter.store.dispatch(updateVisibleForFiltering(newVisible))
    Filter.passFilters()
  },
  filterAllSynapses: function(toVisible) {
    const { allForFiltering, visibleForFiltering } = Filter.store.getState()
    const synapses = toVisible ? Array.from(allForFiltering.synapses) : []
    const newVisible = Object.assign({}, visibleForFiltering, { synapses })
    Filter.store.dispatch(updateVisibleForFiltering(newVisible))
    Filter.passFilters()
  },
  // an abstraction function for toggleMetacode, toggleMapper, toggleSynapse
  // to reduce code redundancy
  // gets called in the context of a list item in a filter box
  toggleLi: function(whichToFilter, id) {
    const { visibleForFiltering } = Filter.store.getState()
    const newList = Array.from(visibleForFiltering[whichToFilter])
    if (newList.indexOf(id) === -1) {
      // add it
      newList.push(id)
    } else {
      // remove it
      newList.splice(newList.indexOf(id), 1)
    }
    const newVisible = Object.assign({}, visibleForFiltering, { [whichToFilter]: newList })
    Filter.store.dispatch(updateVisibleForFiltering(newVisible))
    Filter.passFilters()
  },
  toggleMetacode: function(id) {
    Filter.toggleLi('metacodes', id)
  },
  toggleMapper: function(id) {
    Filter.toggleLi('mappers', id)
  },
  toggleSynapse: function(id) {
    Filter.toggleLi('synapses', id)
  },
  passFilters: function() {
    const visible = Filter.store.getState().visibleForFiltering

    let passesMetacode, passesMapper, passesSynapse

    const opacityForFilter = Active.Map ? 0 : 0.4

    DataModel.Topics.each(function(topic) {
      var n = topic.get('node')
      var metacodeId = topic.get('metacode_id').toString()

      if (visible.metacodes.indexOf(metacodeId) === -1) passesMetacode = false
      else passesMetacode = true

      if (Active.Map) {
        // when on a map,
        // we filter by mapper according to the person who added the
        // topic or synapse to the map
        let userId = topic.getMapping().get('user_id').toString()
        if (visible.mappers.indexOf(userId) === -1) passesMapper = false
        else passesMapper = true
      } else {
        // when on a topic view,
        // we filter by mapper according to the person who created the
        // topic or synapse
        let userId = topic.get('user_id').toString()
        if (visible.mappers.indexOf(userId) === -1) passesMapper = false
        else passesMapper = true
      }

      if (passesMetacode && passesMapper) {
        if (n) {
          n.setData('alpha', 1, 'end')
        } else {
          console.log(topic)
        }
      } else {
        if (n) {
          Control.deselectNode(n, true)
          n.setData('alpha', opacityForFilter, 'end')
          n.eachAdjacency(function(e) {
            Control.deselectEdge(e, true)
          })
        } else {
          console.log(topic)
        }
      }
    })

    // flag all the edges back to 'untouched'
    DataModel.Synapses.each(function(synapse) {
      var e = synapse.get('edge')
      e.setData('touched', false)
    })
    DataModel.Synapses.each(function(synapse) {
      var e = synapse.get('edge')
      var desc
      var userId = synapse.get('user_id').toString()

      if (e && !e.getData('touched')) {
        var synapses = e.getData('synapses')

        // if any of the synapses represent by the edge are still unfiltered
        // leave the edge visible
        passesSynapse = false
        for (let i = 0; i < synapses.length; i++) {
          desc = synapses[i].get('desc')
          if (visible.synapses.indexOf(desc) > -1) passesSynapse = true
        }

        // if the synapse description being displayed is now being
        // filtered, set the displayIndex to the first unfiltered synapse if there is one
        var displayIndex = e.getData('displayIndex') ? e.getData('displayIndex') : 0
        var displayedSynapse = synapses[displayIndex]
        desc = displayedSynapse.get('desc')
        if (passesSynapse && visible.synapses.indexOf(desc) === -1) {
          // iterate and find an unfiltered one
          for (let i = 0; i < synapses.length; i++) {
            desc = synapses[i].get('desc')
            if (visible.synapses.indexOf(desc) > -1) {
              e.setData('displayIndex', i)
              break
            }
          }
        }

        if (Active.Map) {
          // when on a map,
          // we filter by mapper according to the person who added the
          // topic or synapse to the map
          userId = synapse.getMapping().get('user_id').toString()
        }
        if (visible.mappers.indexOf(userId) === -1) passesMapper = false
        else passesMapper = true

        var color = Settings.colors.synapses.normal
        if (passesSynapse && passesMapper) {
          e.setData('alpha', 1, 'end')
          e.setData('color', color, 'end')
        } else {
          Control.deselectEdge(e, true)
          e.setData('alpha', opacityForFilter, 'end')
        }

        e.setData('touched', true)
      } else if (!e) {
        console.log(synapse)
      }
    })

    // run the animation
    Visualize.mGraph.fx.animate({
      modes: ['node-property:alpha',
        'edge-property:alpha'],
      duration: 200
    })
  }
}

export default Filter
