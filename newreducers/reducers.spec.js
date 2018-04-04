/* global describe, it */

import { expect } from 'chai'

import reducers from './reducers'

describe('reducers.js', function() {
  describe('whole thing', function() {
    it('has an empty object as default state', function() {
      const state = reducers(undefined, {type: 'RUN'})
      expect(state).to.deep.equal({})
    })
  })
})
