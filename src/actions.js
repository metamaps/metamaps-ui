import Active from './Metamaps/Active'
import DataFetcher from './Metamaps/DataFetcher'

/* async actions */
export const APPROVE_ACCESS_REQUEST = 'APPROVE_ACCESS_REQUEST'
export const APPROVE_ACCESS_REQUEST_COMPLETED = APPROVE_ACCESS_REQUEST + '_COMPLETED'
export const GET_METACODES = 'GET_METACODES'
export const GET_METACODES_COMPLETED = GET_METACODES + '_COMPLETED'

/* other actions */
export const INCREMENT_UNREAD_MESSAGES = 'INCREMENT_UNREAD_MESSAGES'
export const INCREMENT_UNREAD_NOTIFICATION_COUNT = 'INCREMENT_UNREAD_NOTIFICATION_COUNT'
export const DECREMENT_UNREAD_MESSAGES = 'DECREMENT_UNREAD_MESSAGES'
export const DECREMENT_UNREAD_NOTIFICATION_COUNT = 'DECREMENT_UNREAD_NOTIFICATION_COUNT'

/* raw updates to the state */
export const UPDATE_ALL_FOR_FILTERING = 'UPDATE_ALL_FOR_FILTERING'
export const UPDATE_CONTEXT_MENU = 'UPDATE_CONTEXT_MENU'
export const UPDATE_CONTEXT_NODE = 'UPDATE_CONTEXT_NODE'
export const UPDATE_CONTEXT_EDGE = 'UPDATE_CONTEXT_EDGE'
export const UPDATE_CONTEXT_POS = 'UPDATE_CONTEXT_POS'
export const UPDATE_CONTEXT_FETCHING_SIBLINGS_DATA = 'UPDATE_CONTEXT_FETCHING_SIBLINGS_DATA'
export const UPDATE_CONTEXT_SIBLINGS_DATA = 'UPDATE_CONTEXT_SIBLINGS_DATA'
export const UPDATE_CONVERSATION_LIVE = 'UPDATE_CONVERSATION_LIVE'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const UPDATE_FILTER_DATA = 'UPDATE_FILTER_DATA'
export const UPDATE_HAS_LEARNED_TOPIC_CREATION = 'UPDATE_HAS_LEARNED_TOPIC_CREATION'
export const UPDATE_IS_NEW_MAP = 'UPDATE_IS_NEW_MAP'
export const UPDATE_IS_PARTICIPATING = 'UPDATE_IS_PARTICIPATING'
export const UPDATE_JUNTO_STATE = 'UPDATE_JUNTO_STATE'
export const UPDATE_MAP = 'UPDATE_MAP'
export const UPDATE_MAPS = 'UPDATE_MAPS'
export const UPDATE_MAP_IS_STARRED = 'UPDATE_MAP_IS_STARRED'
export const UPDATE_MAPS_WIDTH = 'UPDATE_MAPS_WIDTH'
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const UPDATE_METACODES = 'UPDATE_METACODES'
export const UPDATE_METACODE_SETS = 'UPDATE_METACODE_SETS'
export const UPDATE_MORE_TO_LOAD = 'UPDATE_MORE_TO_LOAD'
export const UPDATE_MOBILE = 'UPDATE_MOBILE'
export const UPDATE_MOBILE_TITLE = 'UPDATE_MOBILE_TITLE'
export const UPDATE_MOBILE_TITLE_WIDTH = 'UPDATE_MOBILE_TITLE_WIDTH'
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS'
export const UPDATE_NOTIFICATIONS_LOADING = 'UPDATE_NOTIFICATIONS_LOADING'
export const UPDATE_OPEN_SYNAPSE = 'UPDATE_OPEN_SYNAPSE'
export const UPDATE_OPEN_TOPIC = 'UPDATE_OPEN_TOPIC'
export const UPDATE_PARTICIPANTS = 'UPDATE_PARTICIPANTS'
export const UPDATE_PENDING = 'UPDATE_PENDING'
export const UPDATE_RELEVANT_PEOPLE_FOR_MAP = 'UPDATE_RELEVANT_PEOPLE_FOR_MAP'
export const UPDATE_REQUESTS = 'UPDATE_REQUESTS'
export const UPDATE_SECTION = 'UPDATE_SECTION'
export const UPDATE_SELECTED_METACODES = 'UPDATE_SELECTED_METACODES'
export const UPDATE_SERVER_DATA = 'UPDATE_SERVER_DATA'
export const UPDATE_SYNAPSE_CARD_POSITION = 'UPDATE_SYNAPSE_CARD_POSITION'
export const UPDATE_SYNAPSE_CARD_SYNAPSES = 'UPDATE_SYNAPSE_CARD_SYNAPSES'
export const UPDATE_TOAST = 'UPDATE_TOAST'
export const UPDATE_TOPIC = 'UPDATE_TOPIC'
export const UPDATE_UNREAD_MESSAGES = 'UPDATE_UNREAD_MESSAGES'
export const UPDATE_UNREAD_NOTIFICATION_COUNT = 'UPDATE_UNREAD_NOTIFICATION_COUNT'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_VISIBLE_FOR_FILTERING = 'UPDATE_VISIBLE_FOR_FILTERING'

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

export function approveAccessRequest(mapId, requestId) {
  return asyncActionCreator(APPROVE_ACCESS_REQUEST, () => {
    return DataFetcher.approveAccessRequest(mapId, requestId)
  }, { mapId, requestId })
}

export function getMetacodes() {
  return asyncActionCreator(GET_METACODES, () => DataFetcher.getMetacodes())
}

export function decrementUnreadNotificationCount() {
  return {
    type: DECREMENT_UNREAD_NOTIFICATION_COUNT
  }
}

export function decrementUnreadMessages() {
  return {
    type: DECREMENT_UNREAD_MESSAGES
  }
}

export function incrementUnreadNotificationCount() {
  return {
    type: INCREMENT_UNREAD_NOTIFICATION_COUNT
  }
}

export function incrementUnreadMessages() {
  return {
    type: INCREMENT_UNREAD_MESSAGES
  }
}

export function updateAllForFiltering(value) {
  return {
    type: UPDATE_ALL_FOR_FILTERING,
    payload: value
  }
}

export function updateContextMenu(value) {
  return {
    type: UPDATE_CONTEXT_MENU,
    payload: value
  }
}

export function updateContextNode(value) {
  return {
    type: UPDATE_CONTEXT_NODE,
    payload: value
  }
}

export function updateContextEdge(value) {
  return {
    type: UPDATE_CONTEXT_EDGE,
    payload: value
  }
}

export function updateContextPos(value) {
  return {
    type: UPDATE_CONTEXT_POS,
    payload: value
  }
}

export function updateContextFetchingSiblingsData(value) {
  return {
    type: UPDATE_CONTEXT_FETCHING_SIBLINGS_DATA,
    payload: value
  }
}

export function updateContextSiblingsData(value) {
  return {
    type: UPDATE_CONTEXT_SIBLINGS_DATA,
    payload: value
  }
}

export function updateConversationLive(value) {
  return {
    type: UPDATE_CONVERSATION_LIVE,
    payload: value
  }
}

export function updateCurrentUser(value) {
  // HACK/TODO: right now we just hard update this here, since
  // many files reference this by 'import'
  Active.Mapper = value
  return {
    type: UPDATE_CURRENT_USER,
    payload: value
  }
}

export function updateFilterData(value) {
  return {
    type: UPDATE_FILTER_DATA,
    payload: value
  }
}

export function updateHasLearnedTopicCreation(value) {
  return {
    type: UPDATE_HAS_LEARNED_TOPIC_CREATION,
    payload: value
  }
}

export function updateIsNewMap(value) {
  return {
    type: UPDATE_IS_NEW_MAP,
    payload: value
  }
}

export function updateIsParticipating(value) {
  return {
    type: UPDATE_IS_PARTICIPATING,
    payload: value
  }
}

export function updateJuntoState(value) {
  return {
    type: UPDATE_JUNTO_STATE,
    payload: value
  }
}

export function updateMap(value) {
  // HACK/TODO: right now we just hard update this here, since
  // many files reference this by 'import'
  Active.Map = value
  return {
    type: UPDATE_MAP,
    payload: value
  }
}

export function updateMapIsStarred(value) {
  return {
    type: UPDATE_MAP_IS_STARRED,
    payload: value
  }
}

export function updateMaps(value) {
  return {
    type: UPDATE_MAPS,
    payload: value
  }
}

export function updateMapsWidth(value) {
  return {
    type: UPDATE_MAPS_WIDTH,
    payload: value
  }
}

export function updateMessages(value) {
  return {
    type: UPDATE_MESSAGES,
    payload: value
  }
}

export function updateMetacodes(value) {
  return {
    type: UPDATE_METACODES,
    payload: value
  }
}

export function updateMetacodeSets(value) {
  return {
    type: UPDATE_METACODE_SETS,
    payload: value
  }
}

export function updateMoreToLoad(value) {
  return {
    type: UPDATE_MORE_TO_LOAD,
    payload: value
  }
}

export function updateMobile(value) {
  return {
    type: UPDATE_MOBILE,
    payload: value
  }
}

export function updateMobileTitle(value) {
  return {
    type: UPDATE_MOBILE_TITLE,
    payload: value
  }
}

export function updateMobileTitleWidth(value) {
  return {
    type: UPDATE_MOBILE_TITLE_WIDTH,
    payload: value
  }
}

export function updateNotifications(value) {
  return {
    type: UPDATE_NOTIFICATIONS,
    payload: value
  }
}

export function updateNotificationsLoading(value) {
  return {
    type: UPDATE_NOTIFICATIONS_LOADING,
    payload: value
  }
}

export function updateOpenSynapse(value) {
  return {
    type: UPDATE_OPEN_SYNAPSE,
    payload: value
  }
}

export function updateOpenTopic(value) {
  return {
    type: UPDATE_OPEN_TOPIC,
    payload: value
  }
}

export function updateParticipants(value) {
  return {
    type: UPDATE_PARTICIPANTS,
    payload: value
  }
}

export function updatePending(value) {
  return {
    type: UPDATE_PENDING,
    payload: value
  }
}

export function updateRelevantPeopleForMap(value) {
  return {
    type: UPDATE_RELEVANT_PEOPLE_FOR_MAP,
    payload: value
  }
}

export function updateRequests(value) {
  return {
    type: UPDATE_REQUESTS,
    payload: value
  }
}

export function updateSection(value) {
  return {
    type: UPDATE_SECTION,
    payload: value
  }
}

export function updateSelectedMetacodes(value) {
  return {
    type: UPDATE_SELECTED_METACODES,
    payload: value
  }
}

export function updateServerData(value) {
  return {
    type: UPDATE_SERVER_DATA,
    payload: value
  }
}

export function updateSynapseCardPosition(value) {
  return {
    type: UPDATE_SYNAPSE_CARD_POSITION,
    payload: value
  }
}

export function updateSynapseCardSynapses(value) {
  return {
    type: UPDATE_SYNAPSE_CARD_SYNAPSES,
    payload: value
  }
}

export function updateToast(value) {
  return {
    type: UPDATE_TOAST,
    payload: value
  }
}

export function updateTopic(value) {
  // HACK/TODO: right now we just hard update this here, since
  // many files reference this by 'import'
  Active.Topic = value
  return {
    type: UPDATE_TOPIC,
    payload: value
  }
}

export function updateUnreadMessages(value) {
  return {
    type: UPDATE_UNREAD_MESSAGES,
    payload: value
  }
}

export function updateUnreadNotificationCount(value) {
  return {
    type: UPDATE_UNREAD_NOTIFICATION_COUNT,
    payload: value
  }
}

export function updateUser(value) {
  return {
    type: UPDATE_USER,
    payload: value
  }
}

export function updateVisibleForFiltering(value) {
  return {
    type: UPDATE_VISIBLE_FOR_FILTERING,
    payload: value
  }
}
