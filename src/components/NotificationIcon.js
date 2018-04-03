import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NotificationIcon extends Component {

  static propTypes = {
    unreadNotificationCount: PropTypes.number,
    toggleNotificationsBox: PropTypes.func
  }

  render = () => {
    const { toggleNotificationsBox } = this.props
    let linkClasses = 'notificationsIcon upperRightEl upperRightIcon '
    linkClasses += 'ignore-react-onclickoutside '

    if (this.props.unreadNotificationCount > 0) {
      linkClasses += 'unread'
    } else {
      linkClasses += 'read'
    }

    return (
      <div className={linkClasses} onClick={toggleNotificationsBox}>
        <div className="tooltipsUnder">
          Notifications
        </div>
        {this.props.unreadNotificationCount === 0 ? null : (
          <div className="unread-notifications-dot"></div>
        )}
      </div>

    )
  }
}

export default NotificationIcon
