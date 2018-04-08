import React, { Component } from 'react'

import LoadingPage from '../helpers/LoadingPage'
import Notification from '../../components/Notification'

import {
  MAP_ACCESS_REQUEST,
  MAP_ACCESS_APPROVED,
  MAP_INVITE_TO_EDIT
} from '../../constants'
import NotificationsHeader from './NotificationsHeader'

const BLACKLIST = [MAP_ACCESS_REQUEST, MAP_ACCESS_APPROVED, MAP_INVITE_TO_EDIT]

/* TODO!!
  pagination
*/

class Notifications extends Component {
  componentWillMount = () => {
    const { notifications, fetchNotifications } = this.props
    if (notifications.needsFetch) {
      fetchNotifications()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { notifications } = nextProps
    const { fetchNotifications } = this.props
    if (notifications.needsFetch) {
      fetchNotifications()
    }
  }

  render = () => {
    const { notifications, markAsRead, markAsUnread } = this.props
    const list = notifications.data.filter(n => !(BLACKLIST.indexOf(n.type) > -1 && (!n.data.object || !n.data.map)))
    if (notifications.isLoading) {
      return (
        <div>
          <LoadingPage />
          <NotificationsHeader />
        </div>
      )
    }
    return (
      <div>
        <div id="yield">
          <div className="centerContent notificationsPage">
            <header className="page-header">
              <h2 className="title">Notifications</h2>
            </header>
            <ul className="notifications">
              {list.map(n => {
                return (
                  <Notification key={`notification-${n.id}`}
                    notification={n}
                    markAsRead={markAsRead}
                    markAsUnread={markAsUnread} />
                )
              })}
              {list.length === 0 && <div className="emptyInbox">
                    You have no notifications. More time for dancing.
              </div>}
            </ul>
          </div>
        </div>
        <NotificationsHeader />
      </div>
    )
  }
}

/*
{notifications.total_pages > 1 && <div className="centerContent withPadding pagination">
            <Paginate notifications={notifications} />
          </div>}
*/

class Paginate extends Component {
  render = () => {
    return null
  }
}

export default Notifications
