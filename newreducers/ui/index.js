import { combineReducers } from 'redux'

import juntoState from './juntoState'
import maps from './maps'
import topics from './topics'

function mobileTitle(state = '', action) {
  return state
}

function mobileTitleWidth(state = 0, action) {
  return state
}

function mapsWidth(state = 0, action) {
  return state
}

function currentUserId(state = null, action) {
  return state
}

function unreadNotificationCount(state = 0, action) {
  return state
}

function toast(state = null, action) {
  return state
}

export default combineReducers({
  mobileTitle,
  mobileTitleWidth,
  mapsWidth,
  currentUserId,
  unreadNotificationCount,
  toast,
  juntoState,
  maps,
  topics
})
