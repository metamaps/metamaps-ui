/* global describe, it */

import { expect } from 'chai'

import {
  SET_JUNTO_STATE
} from '../../src/actions'

import reducers from '../../src/reducers/juntoState'

describe('juntoState', function() {
  it('sets a default value', function() {
    const state = reducers(undefined, {
      type: 'FUN'
    })
    expect(state).to.deep.equal({
      connectedPeople: {},
      liveMaps: {}
    })
  })

  it('can set the juntoState value', function() {
    const state = reducers(undefined, {
      type: SET_JUNTO_STATE,
      payload: {
        connectedPeople: { hi: 'hi' },
        liveMaps: { test: 'test' }
      }
    })
    expect(state).to.deep.equal({
      connectedPeople: { hi: 'hi' },
      liveMaps: { test: 'test' }
    })
  })

  it('returns the existing state if irrelevant action', function() {
    const state = reducers({
      connectedPeople: { hi: 'hi' },
      liveMaps: { test: 'test' }
    }, {
      type: 'FUN'
    })
    expect(state).to.deep.equal({
      connectedPeople: { hi: 'hi' },
      liveMaps: { test: 'test' }
    })
  })
})
