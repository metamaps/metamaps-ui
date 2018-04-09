import { combineReducers } from 'redux'

import {
  OPEN_NOTIFICATIONS,
  CLOSE_NOTIFICATIONS,
  TOGGLE_NOTIFICATIONS,
  OPEN_USER_MENU,
  CLOSE_USER_MENU,
  TOGGLE_USER_MENU,
  SET_CURRENT_USER_ID,
  SET_MOBILE,
  SET_MOBILE_TITLE,
  SET_MOBILE_TITLE_WIDTH,
  SET_TOAST,
  SET_UNREAD_NOTIFICATION_COUNT,
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  DECREMENT_UNREAD_NOTIFICATION_COUNT
} from '../../actions'

import maps from './maps'
import topics from './topics'

function notificationsOpen(state = false, action) {
  const { type } = action
  if (type === OPEN_NOTIFICATIONS) return true
  else if (type === CLOSE_NOTIFICATIONS) return false
  else if (type === TOGGLE_NOTIFICATIONS) return !state
  else return state
}

function userMenuOpen(state = false, action) {
  const { type } = action
  if (type === OPEN_USER_MENU) return true
  else if (type === CLOSE_USER_MENU) return false
  else if (type === TOGGLE_USER_MENU) return !state
  else return state
}

function mobile(state = false, action) {
  const { type, payload } = action
  if (type === SET_MOBILE) return payload
  else return state
}

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
  userMenuOpen,
  notificationsOpen,
  mobile,
  mobileTitle,
  mobileTitleWidth,
  currentUserId,
  unreadNotificationCount,
  toast,
  maps,
  topics
})
