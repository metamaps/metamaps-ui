// import DataFetcher from './Metamaps/DataFetcher'

/* async actions */
/*
export const APPROVE_ACCESS_REQUEST = 'APPROVE_ACCESS_REQUEST'
export const APPROVE_ACCESS_REQUEST_COMPLETED = APPROVE_ACCESS_REQUEST + '_COMPLETED'
export const GET_METACODES = 'GET_METACODES'
export const GET_METACODES_COMPLETED = GET_METACODES + '_COMPLETED'
*/

export const OPEN_ABOUT = 'OPEN_ABOUT'
export const CLOSE_ABOUT = 'CLOSE_ABOUT'
export const TOGGLE_ABOUT = 'TOGGLE_ABOUT'
export const OPEN_INVITE = 'OPEN_INVITE'
export const CLOSE_INVITE = 'CLOSE_INVITE'
export const TOGGLE_INVITE = 'TOGGLE_INVITE'
export const OPEN_NO_IE = 'OPEN_NO_IE'
export const CLOSE_NO_IE = 'CLOSE_NO_IE'
export const TOGGLE_NO_IE = 'TOGGLE_NO_IE'
export const OPEN_TUTORIAL = 'OPEN_TUTORIAL'
export const CLOSE_TUTORIAL = 'CLOSE_TUTORIAL'
export const TOGGLE_TUTORIAL = 'TOGGLE_TUTORIAL'
export const OPEN_NOTIFICATIONS = 'OPEN_NOTIFICATIONS'
export const CLOSE_NOTIFICATIONS = 'CLOSE_NOTIFICATIONS'
export const TOGGLE_NOTIFICATIONS = 'TOGGLE_NOTIFICATIONS'
export const OPEN_USER_MENU = 'OPEN_USER_MENU'
export const CLOSE_USER_MENU = 'CLOSE_USER_MENU'
export const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU'
export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID'
export const SET_JUNTO_STATE = 'SET_JUNTO_STATE'
export const SET_MOBILE = 'SET_MOBILE'
export const SET_MOBILE_TITLE = 'SET_MOBILE_TITLE'
export const SET_MOBILE_TITLE_WIDTH = 'SET_MOBILE_TITLE_WIDTH'
export const SET_TOAST = 'SET_TOAST'
export const SET_UNREAD_NOTIFICATION_COUNT = 'SET_UNREAD_NOTIFICATION_COUNT'
export const INCREMENT_UNREAD_NOTIFICATION_COUNT = 'INCREMENT_UNREAD_NOTIFICATION_COUNT'
export const DECREMENT_UNREAD_NOTIFICATION_COUNT = 'DECREMENT_UNREAD_NOTIFICATION_COUNT'
export const OPEN_MAP = 'OPEN_MAP'
export const CLOSE_MAP = 'CLOSE_MAP'
// per map
export const SET_UNREAD_MESSAGE_COUNT = 'SET_UNREAD_MESSAGE_COUNT'
export const INCREMENT_UNREAD_MESSAGE_COUNT = 'INCREMENT_UNREAD_MESSAGE_COUNT'
export const DECREMENT_UNREAD_MESSAGE_COUNT = 'DECREMENT_UNREAD_MESSAGE_COUNT'
export const OPEN_CREATE_TOPIC = 'OPEN_CREATE_TOPIC'
export const CLOSE_CREATE_TOPIC = 'CLOSE_CREATE_TOPIC'
export const PIN_CREATE_TOPIC = 'PIN_CREATE_TOPIC'
export const UNPIN_CREATE_TOPIC = 'UNPIN_CREATE_TOPIC'
export const OPEN_CREATE_SYNAPSE = 'OPEN_CREATE_SYNAPSE'
export const CLOSE_CREATE_SYNAPSE = 'CLOSE_CREATE_SYNAPSE'
export const OPEN_METACODE_SET_SELECT = 'OPEN_METACODE_SET_SELECT'
export const CLOSE_METACODE_SET_SELECT = 'CLOSE_METACODE_SET_SELECT'
export const OPEN_TOPIC_CARD = 'OPEN_TOPIC_CARD'
export const CLOSE_TOPIC_CARD = 'CLOSE_TOPIC_CARD'
export const CLOSE_TOPIC_CARDS = 'CLOSE_TOPIC_CARDS'
export const UPDATE_TOPIC_CARD_POS = 'UPDATE_TOPIC_CARD_POS'
export const OPEN_SYNAPSE_CARD = 'OPEN_SYNAPSE_CARD'
export const CLOSE_SYNAPSE_CARD = 'CLOSE_SYNAPSE_CARD'
export const CLOSE_SYNAPSE_CARDS = 'CLOSE_SYNAPSE_CARDS'
export const UPDATE_SYNAPSE_CARD_POS = 'UPDATE_SYNAPSE_CARD_POS'
export const OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU'
export const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU'
export const OPEN_FILTERS = 'OPEN_FILTERS'
export const CLOSE_FILTERS = 'CLOSE_FILTERS'
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS'
export const OPEN_INFO_BOX = 'OPEN_INFO_BOX'
export const CLOSE_INFO_BOX = 'CLOSE_INFO_BOX'
export const OPEN_FORK_MAP = 'OPEN_FORK_MAP'
export const CLOSE_FORK_MAP = 'CLOSE_FORK_MAP'
export const OPEN_IMPORT_EXPORT = 'OPEN_IMPORT_EXPORT'
export const CLOSE_IMPORT_EXPORT = 'CLOSE_IMPORT_EXPORT'
export const OPEN_HELP = 'OPEN_HELP'
export const CLOSE_HELP = 'CLOSE_HELP'
export const CENTER_VIEW = 'CENTER_VIEW'
export const ZOOM_OUT = 'ZOOM_OUT'
export const ZOOM_IN = 'ZOOM_IN'
export const OPEN_CHAT = 'OPEN_CHAT'
export const CLOSE_CHAT = 'CLOSE_CHAT'
export const HIDE_CURSORS = 'HIDE_CURSORS'
export const SHOW_CURSORS = 'SHOW_CURSORS'
export const HIDE_VIDEOS = 'HIDE_VIDEOS'
export const SHOW_VIDEOS = 'SHOW_VIDEOS'
export const MUTE_SOUNDS = 'MUTE_SOUNDS'
export const UNMUTE_SOUNDS = 'UNMUTE_SOUNDS'
export const ADD_METACODE_FILTER = 'ADD_METACODE_FILTER'
export const REMOVE_METACODE_FILTER = 'REMOVE_METACODE_FILTER'
export const CLEAR_METACODES_FILTERS = 'CLEAR_METACODES_FILTERS'
export const FILL_METACODES_FILTERS = 'FILL_METACODES_FILTERS'
export const ADD_MAPPER_FILTER = 'ADD_MAPPER_FILTER'
export const REMOVE_MAPPER_FILTER = 'REMOVE_MAPPER_FILTER'
export const CLEAR_MAPPERS_FILTERS = 'CLEAR_MAPPERS_FILTERS'
export const FILL_MAPPERS_FILTERS = 'FILL_MAPPERS_FILTERS'
export const ADD_SYNAPSE_FILTER = 'ADD_SYNAPSE_FILTER'
export const REMOVE_SYNAPSE_FILTER = 'REMOVE_SYNAPSE_FILTER'
export const CLEAR_SYNAPSES_FILTERS = 'CLEAR_SYNAPSES_FILTERS'
export const FILL_SYNAPSES_FILTERS = 'FILL_SYNAPSES_FILTERS'

// this uses redux-thunk to enable async actions like this
export function asyncActionCreator(baseActionType, asyncAction, meta = null) {
  return dispatch => {
    // dispatch an action to indicate the request is pending
    dispatch({
      type: `${baseActionType}_PENDING`,
      baseActionType,
      meta
    })
    // call the async action
    return asyncAction()
      .then(res => {
        // dispatch the result of the async action
        // if it was successful
        dispatch({
          type: `${baseActionType}_COMPLETED`,
          payload: res,
          baseActionType,
          meta
        })
      })
      .catch(e => {
        // dispatch an error action if async action failed
        dispatch({
          type: `${baseActionType}_FAILED`,
          error: e,
          baseActionType,
          meta
        })
      })
  }
}

export function openAbout() {
  return {
    type: OPEN_ABOUT
  }
}

export function closeAbout() {
  return {
    type: CLOSE_ABOUT
  }
}

export function toggleAbout() {
  return {
    type: TOGGLE_ABOUT
  }
}

export function openTutorial() {
  return {
    type: OPEN_TUTORIAL
  }
}

export function closeTutorial() {
  return {
    type: CLOSE_TUTORIAL
  }
}

export function toggleTutorial() {
  return {
    type: TOGGLE_TUTORIAL
  }
}

export function openNoIe() {
  return {
    type: OPEN_NO_IE
  }
}

export function closeNoIe() {
  return {
    type: CLOSE_NO_IE
  }
}

export function toggleNoIe() {
  return {
    type: TOGGLE_NO_IE
  }
}

export function openInvite() {
  return {
    type: OPEN_INVITE
  }
}

export function closeInvite() {
  return {
    type: CLOSE_INVITE
  }
}

export function toggleInvite() {
  return {
    type: TOGGLE_INVITE
  }
}

export function openNotififications() {
  return {
    type: OPEN_NOTIFICATIONS
  }
}

export function closeNotififications() {
  return {
    type: CLOSE_NOTIFICATIONS
  }
}

export function toggleNotifications() {
  return {
    type: TOGGLE_NOTIFICATIONS
  }
}

export function openUserMenu() {
  return {
    type: OPEN_USER_MENU
  }
}

export function closeUserMenu() {
  return {
    type: CLOSE_USER_MENU
  }
}

export function toggleUserMenu() {
  return {
    type: TOGGLE_USER_MENU
  }
}

export function openMap(id) {
  return {
    type: OPEN_MAP,
    payload: id
  }
}

export function setMobile(val) {
  return {
    type: SET_MOBILE,
    payload: val
  }
}

export function setMobileTitleWidth(val) {
  return {
    type: SET_MOBILE_TITLE_WIDTH,
    payload: val
  }
}

/* PER MAP */
export function centerView(id) {
  return {
    type: CENTER_VIEW,
    payload: id
  }
}

export function zoomOut(id) {
  return {
    type: ZOOM_OUT,
    payload: id
  }
}

export function zoomIn(id) {
  return {
    type: ZOOM_IN,
    payload: id
  }
}

export function toggleFilters(mapId) {
  return {
    type: TOGGLE_FILTERS,
    mapId
  }
}

export function closeFilters(mapId) {
  return {
    type: CLOSE_FILTERS,
    mapId
  }
}

export function openMetacodeSetSelect(mapId) {
  return {
    type: OPEN_METACODE_SET_SELECT,
    mapId
  }
}

export function closeMetacodeSetSelect(mapId) {
  return {
    type: CLOSE_METACODE_SET_SELECT,
    mapId
  }
}

export function openForkMap(mapId) {
  return {
    type: OPEN_FORK_MAP,
    mapId
  }
}

export function closeForkMap(mapId) {
  return {
    type: CLOSE_FORK_MAP,
    mapId
  }
}

export function openHelp(mapId) {
  return {
    type: OPEN_HELP,
    mapId
  }
}

export function closeHelp(mapId) {
  return {
    type: CLOSE_HELP,
    mapId
  }
}

export function openImportExport(mapId) {
  return {
    type: OPEN_IMPORT_EXPORT,
    mapId
  }
}

export function closeImportExport(mapId) {
  return {
    type: CLOSE_IMPORT_EXPORT,
    mapId
  }
}

/*
export function approveAccessRequest(mapId, requestId) {
  return asyncActionCreator(APPROVE_ACCESS_REQUEST, () => {
    return DataFetcher.approveAccessRequest(mapId, requestId)
  }, { mapId, requestId })
}

export function getMetacodes() {
  return asyncActionCreator(GET_METACODES, () => DataFetcher.getMetacodes())
}
*/
