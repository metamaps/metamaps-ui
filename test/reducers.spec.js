/* global describe, it */

import { expect } from 'chai'

import reducers from '../src/reducers'

describe('reducers.js', function() {
  describe('requestsPending', function() {
    it('has an empty object as default state', function() {
      const state = reducers(undefined, {type: 'RUN'})
      expect(state.requestsPending).to.deep.equal({})
    })
    it('sets an async action as pending if pending action is dispatched', function() {
      const state = reducers(undefined, {
        type: 'RUN_PENDING',
        baseActionType: 'RUN'
      })
      expect(state.requestsPending).to.deep.equal({
        RUN: true
      })
    })
    it('sets pending to false if action completed', function() {
      const state = reducers({
        requestsPending: {
          RUN: true
        }
      }, {
        type: 'RUN_COMPLETED',
        baseActionType: 'RUN'
      })
      expect(state.requestsPending).to.deep.equal({
        RUN: false
      })
    })
    it('sets pending to false if action failed', function() {
      const state = reducers({
        requestsPending: {
          RUN: true
        }
      }, {
        type: 'RUN_FAILED',
        baseActionType: 'RUN'
      })
      expect(state.requestsPending).to.deep.equal({
        RUN: false
      })
    })
    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        requestsPending: { FUN: true }
      }, {type: 'RUN'})
      expect(state.requestsPending).to.deep.equal({ FUN: true })
    })
  })

  describe('errors', function() {
    it('has an empty object as default state', function() {
      const state = reducers(undefined, {type: 'RUN'})
      expect(state.errors).to.deep.equal({})
    })
    it('sets an error state to null if pending action is dispatched', function() {
      const state = reducers(undefined, {
        type: 'RUN_PENDING',
        baseActionType: 'RUN'
      })
      expect(state.errors).to.deep.equal({
        RUN: null
      })
    })
    it('sets an error state to null if action completed', function() {
      const state = reducers({
        errors: {
          RUN: 'error'
        }
      }, {
        type: 'RUN_COMPLETED',
        baseActionType: 'RUN'
      })
      expect(state.errors).to.deep.equal({
        RUN: null
      })
    })
    it('sets error if action failed', function() {
      const state = reducers(undefined, {
        type: 'RUN_FAILED',
        baseActionType: 'RUN',
        error: 'error'
      })
      expect(state.errors).to.deep.equal({
        RUN: 'error'
      })
    })
    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        errors: { NOO: 'error' }
      }, {type: 'RUN'})
      expect(state.errors).to.deep.equal({ NOO: 'error' })
    })
  })
})

// current map id comes from the URL
// current topic id comes from the URL
// current metacode id comes from the URL
// current metacode set id comes from the URL
// current notification id comes from the URL
// section of explore maps comes from the URL
// isNewMap comes from the URL ?new

// all the remaining things are synthesis of what's stored in state
const test = {
  requestsPending: {},
  errors: {},
  db: {
    maps: {},
    messages: {},
    users: {},
    topics: {},
    mappings: {},
    synapses: {},
    requests: {},
    stars: {},
    follows: {},
    events: {},
    metacodes: {},
    metacodeSets: {},
    notifications: {}
  },
  ui: {
    mobileTitle: '',
    mobileTitleWidth: 0,
    mapsWidth: 0,
    currentUserId: 123,
    unreadNotificationCount: 10,
    toast: 'Hi!',
    juntoState: {
      connectedPeople: {},
      liveMaps: {}
    },
    maps: {
      123: {
        unreadMessageCount: 0,
        openSynapses: {
          12: {
            x: 10,
            y: 20
          }
        },
        openTopics: {
          13: {
            x: 20,
            y: 10
          }
        },
        contextMenu: {
          node: 12,
          edge: 13,
          pos: { x: 0, y: 0 },
          siblingsData: null // ?
        },
        filters: {
          metacodes: {},
          mappers: {},
          synapses: {}
        }
      }
    },
    topics: {
      1233: {
        openSynapses: {
          12: {
            x: 10,
            y: 20
          }
        },
        openTopics: {
          13: {
            x: 20,
            y: 10
          }
        },
        contextMenu: {
          node: 12,
          edge: 13,
          pos: { x: 0, y: 0 },
          siblingsData: null // ?
        },
        filters: {
          metacodes: {},
          mappers: {},
          synapses: {}
        }
      }
    }
  }
}

/*
  // pending
  contextFetchingSiblingsData,
  pending,
  notificationsLoading,
  
  requestsPending,
  errors,
  allForFiltering,
  contextNode,
  contextEdge,
  contextPos,
  contextSiblingsData,
  conversationLive,
  currentUser,
  filterData,
  hasLearnedTopicCreation,
  isNewMap,
  isParticipating,
  juntoState,
  map,
  maps,
  mapIsStarred,
  mapsWidth,
  messages,
  metacodes,
  metacodeSets,
  moreToLoad,
  mobile,
  mobileTitle,
  mobileTitleWidth,
  notifications,
  openSynapse,
  openTopic,
  participants,
  relevantPeopleForMap,
  requests,
  section,
  selectedMetacodes,
  serverData,
  synapseCardPosition,
  synapseCardSynapses,
  toast,
  topic,
  unreadMessages,
  unreadNotificationCount,
  user,
  visibleForFiltering
*/
