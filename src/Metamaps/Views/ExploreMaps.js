/* global $ */

import Active from '../Active'
import DataModel from '../DataModel'
import GlobalUI, { ReactApp } from '../GlobalUI'
import Loading from '../Loading'

import {
  updatePending,
  updateMoreToLoad,
  updateSection,
  updateUser,
  updateMaps,
  updateMobileTitle
} from '../../actions'

const ExploreMaps = {
  init: function(serverData, store) {
    ExploreMaps.store = store
  },
  updateFromPath: function(path) {
    const [_unused, generalSection, specificSection, id] = path.split('/')

    if (generalSection === 'explore') {
      const capitalize = specificSection.charAt(0).toUpperCase() + specificSection.slice(1)
      ExploreMaps.setCollection(DataModel.Maps[capitalize])
      switch (capitalize) {
        case 'Active':
          document.title = 'Explore Active Maps | Metamaps'
          ExploreMaps.store.dispatch(updateMobileTitle('Recently Active'))
          break
        case 'Featured':
          document.title = 'Explore Featured Maps | Metamaps'
          ExploreMaps.store.dispatch(updateMobileTitle('Featured Maps'))
          break
        case 'Starred':
          document.title = 'Starred Maps | Metamaps'
          ExploreMaps.store.dispatch(updateMobileTitle('Starred Maps'))
          break
        case 'Shared':
          document.title = 'Shared Maps | Metamaps'
          ExploreMaps.store.dispatch(updateMobileTitle('Shared With Me'))
          break
        case 'Mine':
          document.title = 'My Maps | Metamaps'
          ExploreMaps.store.dispatch(updateMobileTitle('My Maps'))
          break
      }
    } else if (generalSection === '') {
      ExploreMaps.setCollection(DataModel.Maps.Active)
      document.title = 'Explore Active Maps | Metamaps'
      ExploreMaps.store.dispatch(updateMobileTitle('Recently Active'))
    }

    const collection = ExploreMaps.store.getState().maps
    if (id) {
      if (collection.mapperId !== id) {
        // empty the collection if we are trying to load the maps
        // collection of a different mapper than we had previously
        collection.reset()
        // TODO: fix, as this won't work as it's setting without redux
        collection.page = 1
      }
      // TODO: fix, as this won't work as it's setting without redux
      collection.mapperId = id
      ExploreMaps.fetchUser()
    }
    if (collection.length === 0) {
      // TODO: integrate Loading into the react app
      Loading.show()
      ExploreMaps.store.dispatch(updatePending(true))
      collection.getMaps()
    }
  },
  setCollection: function(collection) {
    const old = ExploreMaps.store.getState().maps
    if (old) {
      //old.off('add', self.render)
      //old.off('successOnFetch', ExploreMaps.handleSuccess)
      //old.off('errorOnFetch', ExploreMaps.handleError)
    }
    ExploreMaps.store.dispatch(updateMaps(collection))
    ExploreMaps.store.dispatch(updateSection(collection.id))
    ExploreMaps.store.dispatch(updateUser(null))
    //collection.on('add', self.render)
    collection.on('successOnFetch', ExploreMaps.handleSuccess)
    collection.on('errorOnFetch', ExploreMaps.handleError)
  },
  loadMore: function() {
    const collection = ExploreMaps.store.getState().maps
    if (collection.page !== 'loadedAll') {
      collection.getMaps()
      ExploreMaps.store.dispatch(updatePending(true))
    }
  },
  handleSuccess: function() {
    const collection = ExploreMaps.store.getState().maps
    ReactApp.resize()
    ExploreMaps.store.dispatch(updatePending(false))
    Loading.hide()
    if (collection && collection.id === 'mapper') {
      self.fetchUser()
    }
  },
  handleError: function() {
    console.log('error loading maps!') // TODO
    Loading.hide()
  },
  fetchUser: function() {
    var self = ExploreMaps

    const state = ExploreMaps.store.getState()
    const mapper = state.user
    const collection = state.maps
    if (mapper && mapper.id === maps.mapperId) {
      return
    }

    // first load the mapper object and then call the render function
    $.ajax({
      url: '/users/' + collection.mapperId + '/details.json',
      success: function(response) {
        document.title = response.name + ' | Metamaps'
        ExploreMaps.store.dispatch(updateUser(response))
        ExploreMaps.store.dispatch(updateMobileTitle(response.name))
      },
      error: function() {
        // TODO
      }
    })
  },
  onStar: function(map) {
    // TODO: this won't work
    $.post('/maps/' + map.id + '/star')
    map.set('star_count', map.get('star_count') + 1)
    if (DataModel.Stars) DataModel.Stars.push({ user_id: Active.Mapper.id, map_id: map.id })
    DataModel.Maps.Starred.add(map)
    GlobalUI.notifyUser('Map is now starred')
  },
  onRequest: function(map) {
    $.post({
      url: `/maps/${map.id}/access_request`
    })
    GlobalUI.notifyUser('You will be notified by email if request accepted')
  },
  onMapFollow: function(map) {
    const isFollowing = map.isFollowedBy(Active.Mapper)
    $.post({
      url: `/maps/${map.id}/${isFollowing ? 'un' : ''}follow`
    })
    if (isFollowing) {
      GlobalUI.notifyUser('You are no longer following this map')
      Active.Mapper.unfollowMap(map.id)
    } else {
      GlobalUI.notifyUser('You are now following this map')
      Active.Mapper.followMap(map.id)
    }
  }
}

export default ExploreMaps
