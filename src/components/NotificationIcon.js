import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NotificationIcon extends Component {
  static propTypes = {
    unreadNotificationCount: PropTypes.number,
    toggleNotifications: PropTypes.func
  }

  render = () => {
    const { toggleNotifications, unreadNotificationCount } = this.props
    let linkClasses = 'notificationsIcon upperRightEl upperRightIcon '
    linkClasses += 'ignore-react-onclickoutside '

    if (unreadNotificationCount > 0) {
      linkClasses += 'unread'
    } else {
      linkClasses += 'read'
    }

    return (
      <div className={linkClasses} onClick={toggleNotifications}>
        <div className="tooltipsUnder">
          Notifications
        </div>
        {unreadNotificationCount === 0 ? null : (
          <div className="unread-notifications-dot"></div>
        )}
      </div>

    )
  }
}

export default NotificationIcon
