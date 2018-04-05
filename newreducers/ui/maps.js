import { omit, reduce } from 'lodash'

import {
  OPEN_MAP,
  CLOSE_MAP,
  SET_UNREAD_MESSAGE_COUNT,
  INCREMENT_UNREAD_MESSAGE_COUNT,
  DECREMENT_UNREAD_MESSAGE_COUNT,
  OPEN_CREATE_TOPIC,
  CLOSE_CREATE_TOPIC,
  PIN_CREATE_TOPIC,
  UNPIN_CREATE_TOPIC,
  OPEN_CREATE_SYNAPSE,
  CLOSE_CREATE_SYNAPSE,
  OPEN_METACODE_SET_SELECT,
  CLOSE_METACODE_SET_SELECT,
  OPEN_TOPIC_CARD,
  CLOSE_TOPIC_CARD,
  CLOSE_TOPIC_CARDS,
  UPDATE_TOPIC_CARD_POS,
  OPEN_SYNAPSE_CARD,
  CLOSE_SYNAPSE_CARD,
  CLOSE_SYNAPSE_CARDS,
  UPDATE_SYNAPSE_CARD_POS,
  OPEN_CONTEXT_MENU,
  CLOSE_CONTEXT_MENU,
  OPEN_FILTERS,
  CLOSE_FILTERS,
  OPEN_INFO_BOX,
  CLOSE_INFO_BOX,
  OPEN_FORK_MAP,
  CLOSE_FORK_MAP,
  OPEN_IMPORT_EXPORT,
  CLOSE_IMPORT_EXPORT,
  OPEN_HELP,
  CLOSE_HELP,
  OPEN_CHAT,
  CLOSE_CHAT,
  ADD_METACODE_FILTER,
  REMOVE_METACODE_FILTER,
  CLEAR_METACODES_FILTERS,
  FILL_METACODES_FILTERS,
  ADD_MAPPER_FILTER,
  REMOVE_MAPPER_FILTER,
  CLEAR_MAPPERS_FILTERS,
  FILL_MAPPERS_FILTERS,
  ADD_SYNAPSE_FILTER,
  REMOVE_SYNAPSE_FILTER,
  CLEAR_SYNAPSES_FILTERS,
  FILL_SYNAPSES_FILTERS,
  HIDE_CURSORS,
  SHOW_CURSORS,
  HIDE_VIDEOS,
  SHOW_VIDEOS,
  MUTE_SOUNDS,
  UNMUTE_SOUNDS
} from '../actions'

const initialMapState = {
  unreadMessageCount: 0,
  createTopicOpen: false,
  createTopicPinned: false,
  createSynapseOpen: false,
  metacodeSetSelectOpen: false,
  infoBoxOpen: false,
  filtersOpen: false,
  chatOpen: false,
  forkMapOpen: false,
  importExportOpen: false,
  helpOpen: false,
  cursorsVisible: true,
  videosVisible: true,
  soundsOn: true,
  openSynapses: {},
  openTopics: {},
  contextMenu: {
    node: null,
    edge: null,
    pos: { x: 0, y: 0 },
    siblingsData: null // ?
  },
  // represent hidden types
  filters: {
    metacodes: {},
    mappers: {},
    synapses: {}
  }
}

// gen is just a convenience call for Object.assign
function gen() {
  const newArr = Array.from(arguments)
  newArr.unshift({})
  return Object.assign.apply(this, newArr)
}

function openTopicsReducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case (OPEN_TOPIC_CARD):
    case (UPDATE_TOPIC_CARD_POS):
      return gen(state, { [payload.id]: payload.pos })
    case (CLOSE_TOPIC_CARD):
      return gen(omit(state, [payload]))
    case (CLOSE_TOPIC_CARDS):
      return {}
    default:
      return state
  }
}

function openSynapsesReducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case (OPEN_SYNAPSE_CARD):
    case (UPDATE_SYNAPSE_CARD_POS):
      return gen(state, { [payload.id]: payload.pos })
    case (CLOSE_SYNAPSE_CARD):
      return gen(omit(state, [payload]))
    case (CLOSE_SYNAPSE_CARDS):
      return {}
    default:
      return state
  }
}

const contextMenuInitialState = {
  node: null,
  edge: null,
  pos: {
    x: 0,
    y: 0
  },
  siblingsData: null
}
// TODO: siblingsData
function contextMenuReducer(state = contextMenuInitialState, action) {
  const { type, payload } = action
  switch (type) {
    case (OPEN_CONTEXT_MENU):
      return {
        node: payload.node ? payload.node : null,
        pos: payload.pos,
        edge: payload.edge ? payload.edge : null,
        siblingsData: null
      }
    case (CLOSE_CONTEXT_MENU):
      return gen(contextMenuInitialState)
    default:
      return state
  }
}

const filtersInitialState = {
  metacodes: {},
  mappers: {},
  synapses: {}
}
function filtersReducer(state = filtersInitialState, action) {
  const { type, payload } = action
  switch (type) {
    case (ADD_METACODE_FILTER):
      return gen(state, {
        metacodes: gen(state.metacodes, {[payload]: true})
      })
    case (REMOVE_METACODE_FILTER):
      return gen(state, {
        metacodes: gen(omit(state.metacodes, [payload]))
      })
    case (CLEAR_METACODES_FILTERS):
      return gen({
        metacodes: {},
        mappers: gen(state.mappers),
        synapses: gen(state.synapses)
      })
    case (FILL_METACODES_FILTERS):
      // accepts an array, returns an object
      return gen(state, {
        metacodes: reduce(payload, (memo, item) => gen(memo, {[item]: true}), {})
      })
    case (ADD_MAPPER_FILTER):
      return gen(state, {
        mappers: gen(state.mappers, {[payload]: true})
      })
    case (REMOVE_MAPPER_FILTER):
      return gen(state, {
        mappers: gen(omit(state.mappers, [payload]))
      })
    case (CLEAR_MAPPERS_FILTERS):
      return gen({
        metacodes: gen(state.metacodes),
        mappers: {},
        synapses: gen(state.synapses)
      })
    case (FILL_MAPPERS_FILTERS):
      // accepts an array, returns an object
      return gen(state, {
        mappers: reduce(payload, (memo, item) => gen(memo, {[item]: true}), {})
      })
    case (ADD_SYNAPSE_FILTER):
      return gen(state, {
        synapses: gen(state.synapses, {[payload]: true})
      })
    case (REMOVE_SYNAPSE_FILTER):
      return gen(state, {
        synapses: gen(omit(state.synapses, [payload]))
      })
    case (CLEAR_SYNAPSES_FILTERS):
      return gen({
        metacodes: gen(state.metacodes),
        mappers: gen(state.mappers),
        synapses: {}
      })
    case (FILL_SYNAPSES_FILTERS):
      // accepts an array, returns an object
      return gen(state, {
        synapses: reduce(payload, (memo, item) => gen(memo, {[item]: true}), {})
      })
    default:
      return state
  }
}

function mapReducer(state = initialMapState, action) {
  const { type, payload } = action
  switch (type) {
    case (SET_UNREAD_MESSAGE_COUNT):
      return gen(state, { unreadMessageCount: payload })
    case (INCREMENT_UNREAD_MESSAGE_COUNT):
      return gen(state, { unreadMessageCount: state.unreadMessageCount + 1 })
    case (DECREMENT_UNREAD_MESSAGE_COUNT):
      return gen(state, { unreadMessageCount: state.unreadMessageCount - 1 })
    case (OPEN_CREATE_TOPIC):
      return gen(state, { createTopicOpen: true })
    case (CLOSE_CREATE_TOPIC):
      return gen(state, { createTopicOpen: false })
    case (PIN_CREATE_TOPIC):
      return gen(state, { createTopicPinned: true })
    case (UNPIN_CREATE_TOPIC):
      return gen(state, { createTopicPinned: false })
    case (OPEN_CREATE_SYNAPSE):
      return gen(state, { createSynapseOpen: true })
    case (CLOSE_CREATE_SYNAPSE):
      return gen(state, { createSynapseOpen: false })
    case (OPEN_METACODE_SET_SELECT):
      return gen(state, { metacodeSetSelectOpen: true })
    case (CLOSE_METACODE_SET_SELECT):
      return gen(state, { metacodeSetSelectOpen: false })
    case (OPEN_FILTERS):
      return gen(state, { filtersOpen: true })
    case (CLOSE_FILTERS):
      return gen(state, { filtersOpen: false })
    case (OPEN_INFO_BOX):
      return gen(state, { infoBoxOpen: true })
    case (CLOSE_INFO_BOX):
      return gen(state, { infoBoxOpen: false })
    case (OPEN_FORK_MAP):
      return gen(state, { forkMapOpen: true })
    case (CLOSE_FORK_MAP):
      return gen(state, { forkMapOpen: false })
    case (OPEN_IMPORT_EXPORT):
      return gen(state, { importExportOpen: true })
    case (CLOSE_IMPORT_EXPORT):
      return gen(state, { importExportOpen: false })
    case (OPEN_HELP):
      return gen(state, { helpOpen: true })
    case (CLOSE_HELP):
      return gen(state, { helpOpen: false })
    case (OPEN_CHAT):
      return gen(state, { chatOpen: true })
    case (CLOSE_CHAT):
      return gen(state, { chatOpen: false })
    case (HIDE_CURSORS):
      return gen(state, { cursorsVisible: false })
    case (SHOW_CURSORS):
      return gen(state, { cursorsVisible: true })
    case (HIDE_VIDEOS):
      return gen(state, { videosVisible: false })
    case (SHOW_VIDEOS):
      return gen(state, { videosVisible: true })
    case (MUTE_SOUNDS):
      return gen(state, { soundsOn: false })
    case (UNMUTE_SOUNDS):
      return gen(state, { soundsOn: true })
    case (OPEN_TOPIC_CARD):
    case (CLOSE_TOPIC_CARD):
    case (CLOSE_TOPIC_CARDS):
    case (UPDATE_TOPIC_CARD_POS):
      return gen(state, {
        openTopics: openTopicsReducer(state.openTopics, action)
      })
    case (OPEN_SYNAPSE_CARD):
    case (CLOSE_SYNAPSE_CARD):
    case (CLOSE_SYNAPSE_CARDS):
    case (UPDATE_SYNAPSE_CARD_POS):
      return gen(state, {
        openSynapses: openSynapsesReducer(state.openSynapses, action)
      })
    case (OPEN_CONTEXT_MENU):
    case (CLOSE_CONTEXT_MENU):
      return gen(state, {
        contextMenu: contextMenuReducer(state.contextMenu, action)
      })
    case (ADD_METACODE_FILTER):
    case (REMOVE_METACODE_FILTER):
    case (CLEAR_METACODES_FILTERS):
    case (FILL_METACODES_FILTERS):
    case (ADD_MAPPER_FILTER):
    case (REMOVE_MAPPER_FILTER):
    case (CLEAR_MAPPERS_FILTERS):
    case (FILL_MAPPERS_FILTERS):
    case (ADD_SYNAPSE_FILTER):
    case (REMOVE_SYNAPSE_FILTER):
    case (CLEAR_SYNAPSES_FILTERS):
    case (FILL_SYNAPSES_FILTERS):
      return gen(state, {
        filters: filtersReducer(state.filters, action)
      })
    default:
      return state
  }
}

export default function(state = {}, action) {
  const { type, payload, mapId } = action
  switch (type) {
    case (OPEN_MAP):
      return gen(state, {
        [payload]: mapReducer(undefined, action)
      })
    case (CLOSE_MAP):
      return gen(omit(state, [payload]))
    case (SET_UNREAD_MESSAGE_COUNT):
    case (INCREMENT_UNREAD_MESSAGE_COUNT):
    case (DECREMENT_UNREAD_MESSAGE_COUNT):
    case (OPEN_CREATE_TOPIC):
    case (CLOSE_CREATE_TOPIC):
    case (PIN_CREATE_TOPIC):
    case (UNPIN_CREATE_TOPIC):
    case (OPEN_CREATE_SYNAPSE):
    case (CLOSE_CREATE_SYNAPSE):
    case (OPEN_METACODE_SET_SELECT):
    case (CLOSE_METACODE_SET_SELECT):
    case (OPEN_TOPIC_CARD):
    case (CLOSE_TOPIC_CARD):
    case (CLOSE_TOPIC_CARDS):
    case (UPDATE_TOPIC_CARD_POS):
    case (OPEN_SYNAPSE_CARD):
    case (CLOSE_SYNAPSE_CARD):
    case (CLOSE_SYNAPSE_CARDS):
    case (UPDATE_SYNAPSE_CARD_POS):
    case (OPEN_CONTEXT_MENU):
    case (CLOSE_CONTEXT_MENU):
    case (OPEN_FILTERS):
    case (CLOSE_FILTERS):
    case (OPEN_INFO_BOX):
    case (CLOSE_INFO_BOX):
    case (OPEN_FORK_MAP):
    case (CLOSE_FORK_MAP):
    case (OPEN_IMPORT_EXPORT):
    case (CLOSE_IMPORT_EXPORT):
    case (OPEN_HELP):
    case (CLOSE_HELP):
    case (OPEN_CHAT):
    case (CLOSE_CHAT):
    case (HIDE_CURSORS):
    case (SHOW_CURSORS):
    case (HIDE_VIDEOS):
    case (SHOW_VIDEOS):
    case (MUTE_SOUNDS):
    case (UNMUTE_SOUNDS):
    case (ADD_METACODE_FILTER):
    case (REMOVE_METACODE_FILTER):
    case (CLEAR_METACODES_FILTERS):
    case (FILL_METACODES_FILTERS):
    case (ADD_MAPPER_FILTER):
    case (REMOVE_MAPPER_FILTER):
    case (CLEAR_MAPPERS_FILTERS):
    case (FILL_MAPPERS_FILTERS):
    case (ADD_SYNAPSE_FILTER):
    case (REMOVE_SYNAPSE_FILTER):
    case (CLEAR_SYNAPSES_FILTERS):
    case (FILL_SYNAPSES_FILTERS):
      return gen(state, {
        [mapId]: mapReducer(state[mapId], action)
      })
    default:
      return state
  }
}

/*
{
  unreadMessageCount: 0,
  createTopicOpen: true,
  createTopicPinned: true,
  createSynapseOpen: false,
  metacodeSetSelectOpen: false,
  infoBoxOpen: true,
  filtersOpen: false,
  chatOpen: false,
  forkMapOpen: false,
  importExportOpen: false,
  helpOpen: false,
  cursorsVisible: true,
  videosVisible: true,
  soundsOn: true,
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
  // represent hidden types
  filters: {
    metacodes: {},
    mappers: {},
    synapses: {}
  }
}
*/
