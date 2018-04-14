import { combineReducers } from 'redux'

import {
  OPEN_ABOUT,
  CLOSE_ABOUT,
  TOGGLE_ABOUT,
  OPEN_NO_IE,
  CLOSE_NO_IE,
  TOGGLE_NO_IE,
  OPEN_INVITE,
  CLOSE_INVITE,
  TOGGLE_INVITE,
  OPEN_TUTORIAL,
  CLOSE_TUTORIAL,
  TOGGLE_TUTORIAL,
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

function toggleable(state, type, openAction, closeAction, toggleAction) {
  if (type === openAction) return true
  else if (type === closeAction) return false
  else if (type === toggleAction) return !state
  else return state
}

function tutorialOpen(state = false, { type }) {
  return toggleable(state, type, OPEN_TUTORIAL, CLOSE_TUTORIAL, TOGGLE_TUTORIAL)
}

function aboutOpen(state = false, { type }) {
  return toggleable(state, type, OPEN_ABOUT, CLOSE_ABOUT, TOGGLE_ABOUT)
}

function noIeOpen(state = false, { type }) {
  return toggleable(state, type, OPEN_NO_IE, CLOSE_NO_IE, TOGGLE_NO_IE)
}

function inviteOpen(state = false, { type }) {
  return toggleable(state, type, OPEN_INVITE, CLOSE_INVITE, TOGGLE_INVITE)
}

function notificationsOpen(state = false, { type }) {
  return toggleable(state, type, OPEN_NOTIFICATIONS, CLOSE_NOTIFICATIONS, TOGGLE_NOTIFICATIONS)
}

function userMenuOpen(state = false, { type }) {
  return toggleable(state, type, OPEN_USER_MENU, CLOSE_USER_MENU, TOGGLE_USER_MENU)
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
  tutorialOpen,
  aboutOpen,
  noIeOpen,
  inviteOpen,
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
