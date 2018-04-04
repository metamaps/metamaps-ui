/* global describe, it */

import { expect } from 'chai'
import sinon from 'sinon'

import {
  asyncActionCreator
} from '../src/actions'

describe('actions.js asyncActionCreator', function() {
  it('returns a function', function() {
    const result = asyncActionCreator()
    expect(typeof result).to.equal('function')
  })
  it('dispatches an initial pending action when you call the function', function() {
    const dispatch = sinon.spy()
    const baseActionType = 'RUN'
    const asyncAction = () => Promise.resolve('hi')
    const meta = { id: 12 }
    const dispatcher = asyncActionCreator(baseActionType, asyncAction, meta)
    dispatcher(dispatch)
    expect(dispatch).to.have.property('callCount', 1)
    expect(dispatch.calledWith({
      type: 'RUN_PENDING',
      baseActionType: 'RUN',
      meta: { id: 12 }
    })).to.equal(true)
  })
  it('dispatches a completed action if the async action resolves', function() {
    const dispatch = sinon.spy()
    const baseActionType = 'RUN'
    const asyncAction = () => Promise.resolve('hi')
    const meta = { id: 12 }
    const dispatcher = asyncActionCreator(baseActionType, asyncAction, meta)
    return dispatcher(dispatch).then(() => {
      expect(dispatch.calledWith({
        type: 'RUN_PENDING',
        baseActionType: 'RUN',
        meta: { id: 12 }
      })).to.equal(true)
      expect(dispatch.calledWith({
        type: 'RUN_COMPLETED',
        baseActionType: 'RUN',
        payload: 'hi',
        meta: { id: 12 }
      })).to.equal(true)
    })
  })
  it('dispatches a failed action if the async action is rejected', function() {
    const dispatch = sinon.spy()
    const baseActionType = 'RUN'
    const e = new Error('e')
    const asyncAction = () => Promise.reject(e)
    const meta = { id: 12 }
    const dispatcher = asyncActionCreator(baseActionType, asyncAction, meta)
    return dispatcher(dispatch).then(() => {
      expect(dispatch.calledWith({
        type: 'RUN_FAILED',
        baseActionType: 'RUN',
        error: e,
        meta: { id: 12 }
      })).to.equal(true)
    })
  })
})
