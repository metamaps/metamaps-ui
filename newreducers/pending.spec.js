/* global describe, it */

import { expect } from 'chai'

import reducers from './pending'

describe('pending.js', function() {
  it('has an empty object as default state', function() {
    const state = reducers(undefined, {type: 'RUN'})
    expect(state).to.deep.equal({})
  })
  it('sets an async action as pending if pending action is dispatched', function() {
    const state = reducers(undefined, {
      type: 'RUN_PENDING',
      baseActionType: 'RUN'
    })
    expect(state).to.deep.equal({ RUN: true })
  })
  it('sets pending to false if action completed', function() {
    const state = reducers({
      RUN: true
    }, {
      type: 'RUN_COMPLETED',
      baseActionType: 'RUN'
    })
    expect(state).to.deep.equal({ RUN: false })
  })
  it('sets pending to false if action failed', function() {
    const state = reducers({
      RUN: true
    }, {
      type: 'RUN_FAILED',
      baseActionType: 'RUN'
    })
    expect(state).to.deep.equal({ RUN: false })
  })
  it('returns the existing state if irrelevant action', function() {
    const state = reducers({
      FUN: true
    }, {type: 'RUN'})
    expect(state).to.deep.equal({ FUN: true })
  })
})
