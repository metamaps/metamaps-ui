/* global $ */
import { findIndex } from 'lodash'
import GlobalUI from './index'

import {
  updateNotifications,
  updateNotificationsLoading,
  incrementUnreadNotificationCount,
  decrementUnreadNotificationCount
} from '../../actions'

const Notifications = {
  init: (serverData, store) => {
    Notifications.store = store
  },
  fetchNotifications: () => {
    Notifications.store.dispatch(updateNotificationsLoading(true))
    $.ajax({
      url: '/notifications.json',
      success: function(data) {
        Notifications.store.dispatch(updateNotifications(data))
        Notifications.store.dispatch(updateNotificationsLoading(false))
      },
      error: function() {
        GlobalUI.notifyUser('There was an error fetching notifications')
      }
    })
  },
  fetchNotification: (id) => {
    $.ajax({
      url: `/notifications/${id}.json`,
      success: function(data) {
        const arr = Notifications.store.getState().notifications
        const index = findIndex(arr, n => n.id === data.id)
        if (index === -1) {
          // notification not loaded yet, insert it at the start
          // TODO
          Notifications.notifications.unshift(data)
        } else {
          // notification there, replace it
          // TODO
          Notifications.notifications[index] = data
        }
      },
      error: function() {
        GlobalUI.notifyUser('There was an error fetching that notification')
      }
    })
  },
  incrementUnread: () => {
    Notifications.store.dispatch(incrementUnreadNotificationCount())
  },
  decrementUnread: () => {
    Notifications.store.dispatch(decrementUnreadNotificationCount())
  },
  markAsRead: (id) => {
    const n = Notifications.notifications.find(n => n.id === id)
    $.ajax({
      url: `/notifications/${id}/mark_read.json`,
      method: 'PUT',
      success: function(r) {
        if (n) {
          Notifications.store.dispatch(decrementUnreadNotificationCount())
          // TODO
          n.is_read = true
        }
      },
      error: function() {
        GlobalUI.notifyUser('There was an error marking that notification as read')
      }
    })
  },
  markAsUnread: (id) => {
    const n = Notifications.notifications.find(n => n.id === id)
    $.ajax({
      url: `/notifications/${id}/mark_unread.json`,
      method: 'PUT',
      success: function() {
        if (n) {
          Notifications.store.dispatch(incrementUnreadNotificationCount())
          // TODO
          n.is_read = false
        }
      },
      error: function() {
        GlobalUI.notifyUser('There was an error marking that notification as unread')
      }
    })
  }
}

export default Notifications
