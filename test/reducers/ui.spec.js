/* global describe, it */

import { expect } from 'chai'

import {
  SET_CURRENT_USER_ID,
  SET_MOBILE_TITLE,
  SET_MOBILE_TITLE_WIDTH,
  SET_TOAST,
  SET_UNREAD_NOTIFICATION_COUNT,
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  DECREMENT_UNREAD_NOTIFICATION_COUNT
} from '../../src/actions'

import reducers from '../../src/reducers/ui'

describe('reducers/ui', function() {
  describe('mobileTitle', function() {
    it('has empty string as default value', function() {
      const state = reducers(undefined, {
        type: SET_TOAST,
        payload: 'Hello'
      })
      expect(state.mobileTitle).to.equal('')
    })

    it('can set the mobile title', function() {
      const state = reducers(undefined, {
        type: SET_MOBILE_TITLE,
        payload: 'Hello'
      })
      expect(state.mobileTitle).to.equal('Hello')
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({ mobileTitle: 'Test' }, {
        type: SET_TOAST,
        payload: 'Hello'
      })
      expect(state.mobileTitle).to.equal('Test')
    })
  })

  describe('mobileTitleWidth', function() {
    it('has 0 as default value', function() {
      const state = reducers(undefined, {
        type: SET_TOAST,
        payload: 'Hello'
      })
      expect(state.mobileTitleWidth).to.equal(0)
    })

    it('can set the mobile title width', function() {
      const state = reducers(undefined, {
        type: SET_MOBILE_TITLE_WIDTH,
        payload: 3
      })
      expect(state.mobileTitleWidth).to.equal(3)
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({ mobileTitleWidth: 8 }, {
        type: SET_TOAST,
        payload: 'Hello'
      })
      expect(state.mobileTitleWidth).to.equal(8)
    })
  })

  describe('currentUserId', function() {
    it('has null as default value', function() {
      const state = reducers(undefined, {
        type: SET_TOAST,
        payload: 'Hello'
      })
      expect(state.currentUserId).to.equal(null)
    })

    it('can set the current user id', function() {
      const state = reducers(undefined, {
        type: SET_CURRENT_USER_ID,
        payload: 4312
      })
      expect(state.currentUserId).to.equal(4312)
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({ currentUserId: 8 }, {
        type: SET_TOAST,
        payload: 'Hello'
      })
      expect(state.currentUserId).to.equal(8)
    })
  })

  describe('toast', function() {
    it('has null as default value', function() {
      const state = reducers(undefined, {
        type: SET_MOBILE_TITLE,
        payload: ''
      })
      expect(state.toast).to.equal(null)
    })

    it('can set the toast message', function() {
      const state = reducers(undefined, {
        type: SET_TOAST,
        payload: 'Hello'
      })
      expect(state.toast).to.equal('Hello')
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({ toast: 'Hello' }, {
        type: SET_MOBILE_TITLE_WIDTH,
        payload: 8
      })
      expect(state.toast).to.equal('Hello')
    })
  })

  describe('unreadNotificationCount', function() {
    it('has 0 as default value', function() {
      const state = reducers(undefined, {
        type: SET_MOBILE_TITLE,
        payload: ''
      })
      expect(state.unreadNotificationCount).to.equal(0)
    })

    it('can set the unread notification count', function() {
      const state = reducers(undefined, {
        type: SET_UNREAD_NOTIFICATION_COUNT,
        payload: 24
      })
      expect(state.unreadNotificationCount).to.equal(24)
    })

    it('can increment the notification count', function() {
      const state = reducers({ unreadNotificationCount: 10 }, {
        type: INCREMENT_UNREAD_NOTIFICATION_COUNT
      })
      expect(state.unreadNotificationCount).to.equal(11)
    })

    it('can decrement the notification count', function() {
      const state = reducers({ unreadNotificationCount: 10 }, {
        type: DECREMENT_UNREAD_NOTIFICATION_COUNT
      })
      expect(state.unreadNotificationCount).to.equal(9)
    })

    it('returns the existing state if irrelevant action', function() {
      const state = reducers({ unreadNotificationCount: 24 }, {
        type: SET_MOBILE_TITLE_WIDTH,
        payload: 8
      })
      expect(state.unreadNotificationCount).to.equal(24)
    })
  })
})
