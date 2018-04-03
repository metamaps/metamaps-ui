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
        const arr = Array.from(Notifications.store.getState().notifications)
        const index = findIndex(arr, n => n.id === data.id)
        if (index === -1) {
          // notification not loaded yet, insert it at the start
          arr.unshift(data)
        } else {
          // notification there, replace it
          arr[index] = data
        }
        Notifications.store.dispatch(updateNotifications(arr))
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
    let arr = Array.from(Notifications.store.getState().notifications)
    const n = arr.find(n => n.id === id)
    $.ajax({
      url: `/notifications/${id}/mark_read.json`,
      method: 'PUT',
      success: function(r) {
        if (n) {
          Notifications.store.dispatch(decrementUnreadNotificationCount())
          // TODO move this login into the reducers
          arr = arr.map(notif => {
            if (n.id === id) {
              return Object.assign({}, notif, {is_read: true})
            } else {
              return Object.assign({}, notif)
            }
          })
          Notifications.store.dispatch(updateNotifications(arr))
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
          // TODO move this login into the reducers
          arr = arr.map(notif => {
            if (n.id === id) {
              return Object.assign({}, notif, {is_read: false})
            } else {
              return Object.assign({}, notif)
            }
          })
          Notifications.store.dispatch(updateNotifications(arr))
        }
      },
      error: function() {
        GlobalUI.notifyUser('There was an error marking that notification as unread')
      }
    })
  }
}

export default Notifications
