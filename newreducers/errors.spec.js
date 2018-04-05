/* global describe, it */

import { expect } from 'chai'

import reducers from './errors'

describe('errors.js', function() {
  it('has an empty object as default state', function() {
    const state = reducers(undefined, {type: 'RUN'})
    expect(state).to.deep.equal({})
  })
  it('sets an error state to null if pending action is dispatched', function() {
    const state = reducers(undefined, {
      type: 'RUN_PENDING',
      baseActionType: 'RUN'
    })
    expect(state).to.deep.equal({ RUN: null })
  })
  it('sets an error state to null if action completed', function() {
    const state = reducers({
      RUN: 'error'
    }, {
      type: 'RUN_COMPLETED',
      baseActionType: 'RUN'
    })
    expect(state).to.deep.equal({ RUN: null })
  })
  it('sets error if action failed', function() {
    const state = reducers(undefined, {
      type: 'RUN_FAILED',
      baseActionType: 'RUN',
      error: 'error'
    })
    expect(state).to.deep.equal({ RUN: 'error' })
  })
  it('returns the existing state if irrelevant action', function() {
    const state = reducers({ NOO: 'error' }, {type: 'RUN'})
    expect(state).to.deep.equal({ NOO: 'error' })
  })
})
