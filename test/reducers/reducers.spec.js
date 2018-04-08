/* global describe, it */

import { expect } from 'chai'

import reducers from '../../src/reducers'

describe('reducers.js', function() {
  it('has the right default state', function() {
    const state = reducers(undefined, {type: 'RUN'})
    expect(state).to.deep.equal({
      models: {},
      juntoState: {
        connectedPeople: {},
        liveMaps: {}
      },
      ui: {
        currentUserId: null,
        mobileTitle: '',
        mobileTitleWidth: 0,
        toast: null,
        unreadNotificationCount: 0,
        maps: {},
        topics: {}
      },
      pending: {},
      errors: {}
    })
  })

  describe('pending', function() {
    it('has an empty object as default state', function() {
      const state = reducers(undefined, {type: 'RUN'})
      expect(state.pending).to.deep.equal({})
    })
    it('sets an async action as pending if pending action is dispatched', function() {
      const state = reducers(undefined, {
        type: 'RUN_PENDING',
        baseActionType: 'RUN'
      })
      expect(state.pending).to.deep.equal({
        RUN: true
      })
    })
    it('sets pending to false if action completed', function() {
      const state = reducers({
        pending: {
          RUN: true
        }
      }, {
        type: 'RUN_COMPLETED',
        baseActionType: 'RUN'
      })
      expect(state.pending).to.deep.equal({
        RUN: false
      })
    })
    it('sets pending to false if action failed', function() {
      const state = reducers({
        pending: {
          RUN: true
        }
      }, {
        type: 'RUN_FAILED',
        baseActionType: 'RUN'
      })
      expect(state.pending).to.deep.equal({
        RUN: false
      })
    })
    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        pending: { FUN: true }
      }, {type: 'RUN'})
      expect(state.pending).to.deep.equal({ FUN: true })
    })
  })

  describe('errors', function() {
    it('has an empty object as default state', function() {
      const state = reducers(undefined, {type: 'RUN'})
      expect(state.errors).to.deep.equal({})
    })
    it('sets an error state to null if pending action is dispatched', function() {
      const state = reducers(undefined, {
        type: 'RUN_PENDING',
        baseActionType: 'RUN'
      })
      expect(state.errors).to.deep.equal({
        RUN: null
      })
    })
    it('sets an error state to null if action completed', function() {
      const state = reducers({
        errors: {
          RUN: 'error'
        }
      }, {
        type: 'RUN_COMPLETED',
        baseActionType: 'RUN'
      })
      expect(state.errors).to.deep.equal({
        RUN: null
      })
    })
    it('sets error if action failed', function() {
      const state = reducers(undefined, {
        type: 'RUN_FAILED',
        baseActionType: 'RUN',
        error: 'error'
      })
      expect(state.errors).to.deep.equal({
        RUN: 'error'
      })
    })
    it('returns the existing state if irrelevant action', function() {
      const state = reducers({
        errors: { NOO: 'error' }
      }, {type: 'RUN'})
      expect(state.errors).to.deep.equal({ NOO: 'error' })
    })
  })
})
