import { combineReducers } from 'redux'

import {
  SET_CURRENT_USER_ID,
  SET_MOBILE_TITLE,
  SET_MOBILE_TITLE_WIDTH,
  SET_MAPS_WIDTH,
  SET_TOAST,
  SET_UNREAD_NOTIFICATION_COUNT,
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  DECREMENT_UNREAD_NOTIFICATION_COUNT
} from '../actions'

import maps from './maps'
import topics from './topics'

function mobileTitle(state = '', action) {
  const { type, payload } = action
  if (type === SET_MOBILE_TITLE) return payload
  else return state
}

function mobileTitleWidth(state = 0, action) {
  const { type, payload } = action
  if (type === SET_MOBILE_TITLE_WIDTH) return payload
  else return state
}

function mapsWidth(state = 0, action) {
  const { type, payload } = action
  if (type === SET_MAPS_WIDTH) return payload
  else return state
}

function currentUserId(state = null, action) {
  const { type, payload } = action
  if (type === SET_CURRENT_USER_ID) return payload
  else return state
}

function unreadNotificationCount(state = 0, action) {
  const { type, payload } = action
  if (type === SET_UNREAD_NOTIFICATION_COUNT) return payload
  else if (type === INCREMENT_UNREAD_NOTIFICATION_COUNT) return state + 1
  else if (type === DECREMENT_UNREAD_NOTIFICATION_COUNT) return state - 1
  else return state
}

function toast(state = null, action) {
  const { type, payload } = action
  if (type === SET_TOAST) return payload
  else return state
}

export default combineReducers({
  mobileTitle,
  mobileTitleWidth,
  mapsWidth,
  currentUserId,
  unreadNotificationCount,
  toast,
  maps,
  topics
})
