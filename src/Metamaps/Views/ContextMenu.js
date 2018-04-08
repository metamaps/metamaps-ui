/* global $ */
import Control from '../Control'
import Selected from '../Selected'
import Topic from '../Topic'

const ContextMenu = {
  init: function(serverData, store) {
    ContextMenu.store = store
  },
  selectNode: (node, pos) => {
    ContextMenu.store.dispatch(updateContextPos(pos))
    ContextMenu.store.dispatch(updateContextNode(node))
    ContextMenu.store.dispatch(updateContextEdge(null))
    ContextMenu.store.dispatch(updateContextFetchingSiblingsData(false))
    ContextMenu.store.dispatch(updateContextSiblingsData(null))
  },
  selectEdge: (edge, pos) => {
    ContextMenu.store.dispatch(updateContextPos(pos))
    ContextMenu.store.dispatch(updateContextNode(null))
    ContextMenu.store.dispatch(updateContextEdge(edge))
    ContextMenu.store.dispatch(updateContextFetchingSiblingsData(false))
    ContextMenu.store.dispatch(updateContextSiblingsData(null))
  },
  reset: () => {
    ContextMenu.store.dispatch(updateContextNode(null))
    ContextMenu.store.dispatch(updateContextEdge(null))
    ContextMenu.store.dispatch(updateContextFetchingSiblingsData(false))
    ContextMenu.store.dispatch(updateContextSiblingsData(null))
  },
  delete: () => {
    Control.deleteSelected()
    ContextMenu.reset()
  },
  remove: () => {
    Control.removeSelectedEdges()
    Control.removeSelectedNodes()
    ContextMenu.reset()
  },
  hide: () => {
    Control.hideSelectedEdges()
    Control.hideSelectedNodes()
    ContextMenu.reset()
  },
  centerOn: (id) => {
    Topic.centerOn(id)
    ContextMenu.reset()
  },
  popoutTopic: (id) => {
    ContextMenu.reset()
    const win = window.open(`/topics/${id}`, '_blank')
    win.focus()
  },
  updatePermissions: (permission) => {
    // will be 'commons' 'public' or 'private'
    Control.updateSelectedPermissions(permission)
    ContextMenu.reset()
  },
  onMetacodeSelect: (id, metacodeId) => {
    if (Selected.Nodes.length > 1) {
      // batch update multiple topics
      Control.updateSelectedMetacodes(metacodeId)
    } else {
      const topic = DataModel.Topics.get(id)
      topic.save({
        metacode_id: metacodeId
      })
    }
    ContextMenu.reset()
  },
  fetchSiblings: (node, metacodeId) => {
    Topic.fetchSiblings(node, metacodeId)
    ContextMenu.reset()
  },
  populateSiblings: (id) => {
    // depending on how many topics are selected, do different things
    ContextMenu.store.dispatch(updateContextFetchingSiblingsData(true))

    const topics = DataModel.Topics.map(function(t) { return t.id })
    const topicsString = topics.join()

    const successCallback = function(data) {
      ContextMenu.store.dispatch(updateContextFetchingSiblingsData(false))

      // adjust the data for consumption by react
      for (var key in data) {
        data[key] = `${DataModel.Metacodes.get(key).get('name')} (${data[key]})`
      }
      ContextMenu.store.dispatch(updateContextSiblingsData(data))
    }

    $.ajax({
      type: 'GET',
      url: `/topics/${id}/relative_numbers.json?network=${topicsString}`,
      success: successCallback,
      error: function() {}
    })
  }
}

export default ContextMenu
