import { combineReducers } from 'redux'
import { crudReducer } from 'redux-crud-store'

import ui from './ui'
import juntoState from './juntoState'

export default combineReducers({
  models: crudReducer,
  ui,
  juntoState
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
  models: {
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
  juntoState: {
    connectedPeople: {},
    liveMaps: {}
  },
  ui: {
    mobileTitle: '',
    mobileTitleWidth: 0,
    mapsWidth: 0,
    currentUserId: 123,
    unreadNotificationCount: 10,
    toast: 'Hi!',
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
