/* global describe, it */

import { expect } from 'chai'

import reducers from './reducers'

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
        mapsWidth: 0,
        mobileTitle: '',
        mobileTitleWidth: 0,
        toast: null,
        unreadNotificationCount: 0,
        maps: {},
        topics: {}
      }
    })
  })
})
