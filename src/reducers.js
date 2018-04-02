import { combineReducers } from 'redux'

import {
  UPDATE_ALL_FOR_FILTERING,
  UPDATE_CONTEXT_MENU,
  UPDATE_CONTEXT_NODE,
  UPDATE_CONTEXT_EDGE,
  UPDATE_CONTEXT_POS,
  UPDATE_CONTEXT_FETCHING_SIBLINGS_DATA,
  UPDATE_CONTEXT_SIBLINGS_DATA,
  UPDATE_CONVERSATION_LIVE,
  UPDATE_CURRENT_USER,
  UPDATE_FILTER_DATA,
  UPDATE_HAS_LEARNED_TOPIC_CREATION,
  UPDATE_IS_NEW_MAP,
  UPDATE_IS_PARTICIPATING,
  UPDATE_JUNTO_STATE,
  UPDATE_MAP,
  UPDATE_MAPS,
  UPDATE_MAP_IS_STARRED,
  UPDATE_MAPS_WIDTH,
  UPDATE_MESSAGES,
  UPDATE_METACODES,
  UPDATE_METACODE_SETS,
  UPDATE_MORE_TO_LOAD,
  UPDATE_MOBILE,
  UPDATE_MOBILE_TITLE,
  UPDATE_MOBILE_TITLE_WIDTH,
  UPDATE_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS_LOADING,
  UPDATE_OPEN_SYNAPSE,
  UPDATE_OPEN_TOPIC,
  UPDATE_PARTICIPANTS,
  UPDATE_PENDING,
  UPDATE_RELEVANT_PEOPLE_FOR_MAP,
  UPDATE_REQUEST_ANSWERED,
  UPDATE_REQUEST_APPROVED,
  UPDATE_REQUESTS,
  UPDATE_SECTION,
  UPDATE_SELECTED_METACODES,
  UPDATE_SERVER_DATA,
  UPDATE_SYNAPSE_CARD_POSITION,
  UPDATE_SYNAPSE_CARD_SYNAPSES,
  UPDATE_TOAST,
  UPDATE_TOPIC,
  UPDATE_UNREAD_MESSAGES,
  UPDATE_UNREAD_NOTIFICATION_COUNT,
  UPDATE_USER,
  UPDATE_USER_REQUESTED,
  UPDATE_VISIBLE_FOR_FILTERING
} from './actions'

function gen() {
  const newArr = Array.from(arguments)
  newArr.unshift({})
  return Object.assign.apply(this, newArr)
}

function allForFiltering(state = {
  metacodes: [],
  mappers: [],
  synapses: []
}, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_ALL_FOR_FILTERING):
      return payload
    default:
      return state
  }
}

function filterData(state = {
  metacodes: {},
  mappers: {},
  synapses: {}
}, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_FILTER_DATA):
      return payload
    default:
      return state
  }
}

function contextMenu(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CONTEXT_MENU):
      return payload
    default:
      return state
  }
}

function contextNode(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CONTEXT_NODE):
      return payload
    default:
      return state
  }
}

function contextEdge(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CONTEXT_EDGE):
      return payload
    default:
      return state
  }
}

function contextPos(state = {x:0,y:0}, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CONTEXT_POS):
      return payload
    default:
      return state
  }
}

function contextFetchingSiblingsData(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CONTEXT_FETCHING_SIBLINGS_DATA):
      return payload
    default:
      return state
  }
}

function contextSiblingsData(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CONTEXT_SIBLINGS_DATA):
      return payload
    default:
      return state
  }
}

function conversationLive(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CONVERSATION_LIVE):
      return payload
    default:
      return state
  }
}

function currentUser(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_CURRENT_USER):
      return payload
    default:
      return state
  }
}

function hasLearnedTopicCreation(state = true, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_HAS_LEARNED_TOPIC_CREATION):
      return payload
    default:
      return state
  }
}

function isNewMap(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_IS_NEW_MAP):
      return payload
    default:
      return state
  }
}

function isParticipating(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_IS_PARTICIPATING):
      return payload
    default:
      return state
  }
}

function juntoState(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_JUNTO_STATE):
      return payload
    default:
      return state
  }
}

function map(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MAP):
      return payload
    default:
      return state
  }
}

function mapIsStarred(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MAP_IS_STARRED):
      return payload
    default:
      return state
  }
}

function maps(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MAPS):
      return payload
    default:
      return state
  }
}

function mapsWidth(state = 0, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MAPS_WIDTH):
      return payload
    default:
      return state
  }
}

function messages(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MESSAGES):
      return payload
    default:
      return state
  }
}

function metacodes(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_METACODES):
      return payload
    default:
      return state
  }
}

function metacodeSets(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_METACODE_SETS):
      return payload
    default:
      return state
  }
}

function moreToLoad(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MORE_TO_LOAD):
      return payload
    default:
      return state
  }
}

function mobile(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MOBILE):
      return payload
    default:
      return state
  }
}

function mobileTitle(state = '', action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MOBILE_TITLE):
      return payload
    default:
      return state
  }
}

function mobileTitleWidth(state = 0, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MOBILE_TITLE_WIDTH):
      return payload
    default:
      return state
  }
}

function notifications(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_NOTIFICATIONS):
      return payload
    default:
      return state
  }
}

function notificationsLoading(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_NOTIFICATIONS_LOADING):
      return payload
    default:
      return state
  }
}

function openSynapse(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_OPEN_SYNAPSE):
      return payload
    default:
      return state
  }
}

function openTopic(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_OPEN_TOPIC):
      return payload
    default:
      return state
  }
}

function participants(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_PARTICIPANTS):
      return payload
    default:
      return state
  }
}

// This is to do with http requests for maps
function pending(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_PENDING):
      return payload
    default:
      return state
  }
}

function relevantPeopleForMap(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_RELEVANT_PEOPLE_FOR_MAP):
      return payload
    default:
      return state
  }
}

function requestAnswered(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_REQUEST_ANSWERED):
      return payload
    default:
      return state
  }
}

function requestApproved(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_REQUEST_APPROVED):
      return payload
    default:
      return state
  }
}

function section(state = '', action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_SECTION):
      return payload
    default:
      return state
  }
}

function selectedMetacodes(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_SELECTED_METACODES):
      return payload
    default:
      return state
  }
}

function serverData(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_SERVER_DATA):
      return payload
    default:
      return state
  }
}

function synapseCardPosition(state = {x:0,y:0}, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_SYNAPSE_CARD_POSITION):
      return payload
    default:
      return state
  }
}

function synapseCardSynapses(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_SYNAPSE_CARD_SYNAPSES):
      return payload
    default:
      return state
  }
}

function toast(state = '', action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_TOAST):
      return payload
    default:
      return state
  }
}

function topic(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_TOPIC):
      return payload
    default:
      return state
  }
}

function unreadMessages(state = 0, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_MESSAGES):
      return payload
    default:
      return state
  }
}

function unreadNotificationsCount(state = 0, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_UNREAD_NOTIFICATION_COUNT):
      return payload
    default:
      return state
  }
}

// TODO: rename this one (refers to mapper on explore mapper page)
function user(state = null, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_USER):
      return payload
    default:
      return state
  }
}

function userRequested(state = false, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_USER_REQUESTED):
      return payload
    default:
      return state
  }
}

function visibleForFiltering(state = {
  metacodes: [],
  mappers: [],
  synapses: []
}, action) {
  const { type, payload } = action
  switch (type) {
    case (UPDATE_VISIBLE_FOR_FILTERING):
      return payload
    default:
      return state
  }
}

export default combineReducers({
  allForFiltering,
  contextMenu,
  contextNode,
  contextEdge,
  contextPos,
  contextFetchingSiblingsData,
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
  notificationsLoading,
  openSynapse,
  openTopic,
  participants,
  pending,
  relevantPeopleForMap,
  requestAnswered,
  requestApproved,
  section,
  selectedMetacodes,
  serverData,
  synapseCardPosition,
  synapseCardSynapses,
  toast,
  topic,
  unreadMessages,
  unreadNotificationsCount,
  user,
  userRequested,
  visibleForFiltering
})