import { combineReducers } from 'redux'

import * as a from './actions'

function gen() {
  const newArr = Array.from(arguments)
  newArr.unshift({})
  return Object.assign.apply(this, newArr)
}

function hasLearnedTopicCreation(state = true, action) {
  const { type, payload } = action
  switch (type) {
    case (a.SET_HAS_LEARNED_TOPIC_CREATION):
      return gen(
        state,
        { hasLearnedTopicCreation: payload }
      )
    default:
      return gen(state)
  }
}

function allForFiltering(state = {
  metacodes: [],
  mappers: [],
  synapses: []
}, action) {
  return state
}

function filterData(state = {
  metacodes: {},
  mappers: {},
  synapses: {}
}, action) {
  return state
}

function contextMenu(state = false, action) {
  return state
}

function contextNode(state = null, action) {
  return state
}

function contextEdge(state = null, action) {
  return state
}

function contextPos(state = {x:0,y:0}, action) {
  return state
}

function contextFetchingSiblingsData(state = false, action) {
  return state
}

function contextSiblingsData(state = null, action) {
  return state
}

function conversationLive(state = false, action) {
  return state
}

function isNewMap(state = false, action) {
  return state
}

function isParticipating(state = false, action) {
  return state
}

function juntoState(state = {}, action) {
  return state
}

function mapId(state = 0, action) {
  return state
}

function mapIsStarred(state = false, action) {
  return state
}

function mapsWidth(state = 0, action) {
  return state
}

function messages(state = [], action) {
  return state
}

function metacodes(state = [], action) {
  return state
}

function metacodeSets(state = [], action) {
  return state
}

function moreToLoad(state = false, action) {
  return state
}

function mobile(state = false, action) {
  return state
}

function mobileTitle(state = '', action) {
  return state
}

function mobileTitleWidth(state = 0, action) {
  return state
}

function notifications(state = [], action) {
  return state
}

function notificationsLoading(state = false, action) {
  return state
}

function participants(state = [], action) {
  return state
}

function pending(state = false, action) {
  return state
}

function relevantPeopleForMap(state = [], action) {
  return state
}

function requestAnswered(state = false, action) {
  return state
}

function requestApproved(state = false, action) {
  return state
}

function section(state = '', action) {
  return state
}

function selectedMetacodes(state = [], action) {
  return state
}

function serverData(state = {}, action) {
  return state
}

function synapseCardPosition(state = {x:0,y:0}, action) {
  return state
}

function synapseCardSynapses(state = [], action) {
  return state
}

function toast(state = '', action) {
  return state
}

function topicId(state = 0, action) {
  return state
}

function unreadMessages(state = 0, action) {
  return state
}

function unreadNotificationsCount(state = 0, action) {
  return state
}

// TODO: rename this one (refers to mapper on explore mapper page)
function user(state = null, action) {
  return state
}

function userRequested(state = false, action) {
  return state
}

function visibleForFiltering(state = {
  metacodes: [],
  mappers: [],
  synapses: []
}, action) {
  return state
}

export default combineReducers({
  hasLearnedTopicCreation,
  allForFiltering,
  filterData,
  contextMenu,
  contextNode,
  contextEdge,
  contextPos,
  contextFetchingSiblingsData,
  contextSiblingsData,
  conversationLive,
  isNewMap,
  isParticipating,
  juntoState,
  mapId,
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
  topicId,
  unreadMessages,
  unreadNotificationsCount,
  user,
  userRequested,
  visibleForFiltering
})