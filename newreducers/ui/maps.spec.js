/* global describe, it */

import { expect } from 'chai'

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

import reducers from './maps'

describe('ui maps', function() {
  it('should set a default state for a map when you open it', function() {
    const state = reducers(undefined, {
      type: OPEN_MAP,
      payload: 10
    })
    expect(state).to.deep.equal({
      10: {
        chatOpen: false,
        contextMenu: {
          edge: null,
          node: null,
          pos: {
            x: 0,
            y: 0
          },
          siblingsData: null
        },
        createSynapseOpen: false,
        createTopicOpen: false,
        createTopicPinned: false,
        cursorsVisible: true,
        filters: {
          mappers: {},
          metacodes: {},
          synapses: {}
        },
        filtersOpen: false,
        forkMapOpen: false,
        helpOpen: false,
        importExportOpen: false,
        infoBoxOpen: false,
        metacodeSetSelectOpen: false,
        openSynapses: {},
        openTopics: {},
        soundsOn: true,
        unreadMessageCount: 0,
        videosVisible: true
      }
    })
  })

  it('should clear a map when you close it', function() {
    const state = reducers({
      10: {}
    }, {
      type: CLOSE_MAP,
      payload: 10
    })
    expect(state).to.deep.equal({})
  })

  describe('unreadMessageCount', function() {
    it('should have 0 as a default value', function() {
      const state = reducers(undefined, {
        type: OPEN_MAP,
        payload: 10
      })
      expect(state[10].unreadMessageCount).to.equal(0)
    })

    it('can set it for a map', function() {
      const state = reducers(undefined, {
        type: SET_UNREAD_MESSAGE_COUNT,
        payload: 25,
        mapId: 10
      })
      expect(state[10].unreadMessageCount).to.equal(25)
    })

    it('can increment it for a map', function() {
      const state = reducers(undefined, {
        type: INCREMENT_UNREAD_MESSAGE_COUNT,
        mapId: 10
      })
      expect(state[10].unreadMessageCount).to.equal(1)
    })

    it('can decrement it for a map', function() {
      const state = reducers({
        10: {
          unreadMessageCount: 8
        }
      }, {
        type: DECREMENT_UNREAD_MESSAGE_COUNT,
        mapId: 10
      })
      expect(state[10].unreadMessageCount).to.equal(7)
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        10: {
          unreadMessageCount: 8
        }
      }, {
        type: UNMUTE_SOUNDS,
        mapId: 10
      })
      expect(state[10].unreadMessageCount).to.equal(8)
    })
  })

  function assertBooleanElement(prop, defaultVal, openAction, closeAction) {
    describe(prop, function() {
      it('should have ' + defaultVal + ' as a default value', function() {
        const state = reducers(undefined, {
          type: OPEN_MAP,
          payload: 10
        })
        expect(state[10][prop]).to.equal(defaultVal)
      })

      it('can open it for a map', function() {
        const state = reducers(undefined, {
          type: openAction,
          mapId: 10
        })
        expect(state[10][prop]).to.equal(true)
      })

      it('can close it for a map', function() {
        const state = reducers({
          10: {
            [prop]: true
          }
        }, {
          type: closeAction,
          mapId: 10
        })
        expect(state[10][prop]).to.equal(false)
      })

      it('returns the existing state if irrelevant action', function() {
        const state = reducers({
          10: {
            [prop]: true
          }
        }, {
          type: 'IRRELEVANT'
        })
        expect(state[10][prop]).to.equal(true)
      })
    })
  }

  assertBooleanElement('createTopicOpen', false, OPEN_CREATE_TOPIC, CLOSE_CREATE_TOPIC)
  assertBooleanElement('createTopicPinned', false, PIN_CREATE_TOPIC, UNPIN_CREATE_TOPIC)
  assertBooleanElement('createSynapseOpen', false, OPEN_CREATE_SYNAPSE, CLOSE_CREATE_SYNAPSE)
  assertBooleanElement('metacodeSetSelectOpen', false, OPEN_METACODE_SET_SELECT, CLOSE_METACODE_SET_SELECT)
  assertBooleanElement('infoBoxOpen', false, OPEN_INFO_BOX, CLOSE_INFO_BOX)
  assertBooleanElement('filtersOpen', false, OPEN_FILTERS, CLOSE_FILTERS)
  assertBooleanElement('chatOpen', false, OPEN_CHAT, CLOSE_CHAT)
  assertBooleanElement('forkMapOpen', false, OPEN_FORK_MAP, CLOSE_FORK_MAP)
  assertBooleanElement('importExportOpen', false, OPEN_IMPORT_EXPORT, CLOSE_IMPORT_EXPORT)
  assertBooleanElement('helpOpen', false, OPEN_HELP, CLOSE_HELP)
  assertBooleanElement('cursorsVisible', true, SHOW_CURSORS, HIDE_CURSORS)
  assertBooleanElement('videosVisible', true, SHOW_VIDEOS, HIDE_VIDEOS)
  assertBooleanElement('soundsOn', true, UNMUTE_SOUNDS, MUTE_SOUNDS)

  describe('contextMenu', function() {
    it('should have an object as a default value', function() {
      const state = reducers(undefined, {
        type: OPEN_MAP,
        payload: 10
      })
      expect(state[10].contextMenu).to.deep.equal({
        node: null,
        edge: null,
        pos: { x: 0, y: 0 },
        siblingsData: null
      })
    })

    it('can open it for a map', function() {
      const state = reducers(undefined, {
        type: OPEN_CONTEXT_MENU,
        payload: {
          node: 24,
          pos: { x: 10, y: 11 }
        },
        mapId: 10
      })
      expect(state[10].contextMenu).to.deep.equal({
        node: 24,
        edge: null,
        pos: { x: 10, y: 11 },
        siblingsData: null
      })
    })

    it('can close it for a map', function() {
      const state = reducers({
        10: {
          contextMenu: {
            node: 24,
            edge: null,
            pos: { x: 10, y: 11 },
            siblingsData: {}
          }
        }
      }, {
        type: CLOSE_CONTEXT_MENU,
        mapId: 10
      })
      expect(state[10].contextMenu).to.deep.equal({
        node: null,
        edge: null,
        pos: { x: 0, y: 0 },
        siblingsData: null
      })
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        10: {
          contextMenu: {
            node: 12,
            edge: null,
            pos: { x: 10, y: 11 },
            siblingsData: null
          }
        }
      }, {
        type: 'IRRELEVANT'
      })
      expect(state[10].contextMenu).to.deep.equal({
        node: 12,
        edge: null,
        pos: { x: 10, y: 11 },
        siblingsData: null
      })
    })
  })

  describe('openSynapses', function() {
    it('should have {} as a default value', function() {
      const state = reducers(undefined, {
        type: OPEN_MAP,
        payload: 10
      })
      expect(state[10].openSynapses).to.deep.equal({})
    })

    it('can open a synapse card', function() {
      const state = reducers(undefined, {
        type: OPEN_SYNAPSE_CARD,
        payload: {
          id: 13,
          pos: {
            x: 21,
            y: 32
          }
        },
        mapId: 10
      })
      expect(state[10].openSynapses).to.deep.equal({
        13: {
          x: 21,
          y: 32
        }
      })
    })

    it('can update a synapse card position', function() {
      const state = reducers({
        10: {
          openSynapses: {
            13: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: UPDATE_SYNAPSE_CARD_POS,
        payload: {
          id: 13,
          pos: { x: 25, y: 30 }
        },
        mapId: 10
      })
      expect(state[10].openSynapses).to.deep.equal({
        13: {
          x: 25,
          y: 30
        }
      })
    })

    it('can close a synapse card', function() {
      const state = reducers({
        10: {
          openSynapses: {
            13: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: CLOSE_SYNAPSE_CARD,
        payload: 13,
        mapId: 10
      })
      expect(state[10].openSynapses).to.deep.equal({})
    })

    it('can close all synapse cards', function() {
      const state = reducers({
        10: {
          openSynapses: {
            13: {
              x: 10,
              y: 11
            },
            24: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: CLOSE_SYNAPSE_CARDS,
        mapId: 10
      })
      expect(state[10].openSynapses).to.deep.equal({})
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        10: {
          openSynapses: {
            13: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: 'IRRELEVANT'
      })
      expect(state[10].openSynapses).to.deep.equal({
        13: {
          x: 10,
          y: 11
        }
      })
    })
  })

  describe('openTopics', function() {
    it('should have {} as a default value', function() {
      const state = reducers(undefined, {
        type: OPEN_MAP,
        payload: 10
      })
      expect(state[10].openTopics).to.deep.equal({})
    })

    it('can open a topic card', function() {
      const state = reducers(undefined, {
        type: OPEN_TOPIC_CARD,
        payload: {
          id: 13,
          pos: {
            x: 21,
            y: 32
          }
        },
        mapId: 10
      })
      expect(state[10].openTopics).to.deep.equal({
        13: {
          x: 21,
          y: 32
        }
      })
    })

    it('can update a topic card position', function() {
      const state = reducers({
        10: {
          openTopics: {
            13: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: UPDATE_TOPIC_CARD_POS,
        payload: {
          id: 13,
          pos: { x: 25, y: 30 }
        },
        mapId: 10
      })
      expect(state[10].openTopics).to.deep.equal({
        13: {
          x: 25,
          y: 30
        }
      })
    })

    it('can close a topic card', function() {
      const state = reducers({
        10: {
          openTopics: {
            13: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: CLOSE_TOPIC_CARD,
        payload: 13,
        mapId: 10
      })
      expect(state[10].openTopics).to.deep.equal({})
    })

    it('can close all topic cards', function() {
      const state = reducers({
        10: {
          openTopics: {
            13: {
              x: 10,
              y: 11
            },
            24: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: CLOSE_TOPIC_CARDS,
        mapId: 10
      })
      expect(state[10].openTopics).to.deep.equal({})
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        10: {
          openTopics: {
            13: {
              x: 10,
              y: 11
            }
          }
        }
      }, {
        type: 'IRRELEVANT'
      })
      expect(state[10].openTopics).to.deep.equal({
        13: {
          x: 10,
          y: 11
        }
      })
    })
  })

  describe('filters', function() {
    it('has an object as its default state', function() {
      const state = reducers(undefined, {
        type: OPEN_MAP,
        payload: 10
      })
      expect(state[10].filters).to.deep.equal({
        metacodes: {},
        mappers: {},
        synapses: {}
      })
    })

    function assertFilters(prop, addAction, removeAction, clearAction, fillAction) {
      describe(prop, function() {
        it('can add a filtered out category', function() {
          const state = reducers(undefined, {
            type: addAction,
            payload: 'test',
            mapId: 10
          })
          expect(state[10].filters[prop]).to.deep.equal({
            test: true
          })
        })

        it('can remove a filtered out category', function() {
          const state = reducers({
            10: {
              filters: {
                metacodes: { removed: true, remains: true },
                mappers: { removed: true, remains: true },
                synapses: { removed: true, remains: true }
              }
            }
          }, {
            type: removeAction,
            payload: 'removed',
            mapId: 10
          })
          expect(state[10].filters[prop]).to.deep.equal({
            remains: true
          })
        })

        it('can clear the filtered out categories', function() {
          const state = reducers({
            10: {
              filters: {
                metacodes: { test: true },
                mappers: { test: true },
                synapses: { test: true }
              }
            }
          }, {
            type: clearAction,
            mapId: 10
          })
          expect(state[10].filters[prop]).to.deep.equal({})
        })

        it('can set/fill a whole filtered out category', function() {
          const state = reducers(undefined, {
            type: fillAction,
            payload: ['test', 'test2'],
            mapId: 10
          })
          expect(state[10].filters[prop]).to.deep.equal({
            test: true,
            test2: true
          })
        })
      })
    }
    assertFilters(
      'metacodes',
      ADD_METACODE_FILTER,
      REMOVE_METACODE_FILTER,
      CLEAR_METACODES_FILTERS,
      FILL_METACODES_FILTERS
    )
    assertFilters(
      'mappers',
      ADD_MAPPER_FILTER,
      REMOVE_MAPPER_FILTER,
      CLEAR_MAPPERS_FILTERS,
      FILL_MAPPERS_FILTERS
    )
    assertFilters(
      'synapses',
      ADD_SYNAPSE_FILTER,
      REMOVE_SYNAPSE_FILTER,
      CLEAR_SYNAPSES_FILTERS,
      FILL_SYNAPSES_FILTERS
    )
    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        10: {
          filters: {
            metacodes: {},
            mappers: {
              3: true
            },
            synapses: {}
          }
        }
      }, {
        type: 'IRRELEVANT'
      })
      expect(state[10].filters).to.deep.equal({
        metacodes: {},
        mappers: {
          3: true
        },
        synapses: {}
      })
    })
  })
})
