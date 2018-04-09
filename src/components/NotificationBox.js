import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import onClickOutsideAddon from 'react-onclickoutside'
import Notification from './Notification'
import Loading from './Loading'

class NotificationBox extends Component {
  static propTypes = {
    notifications: PropTypes.object,
    fetchNotifications: PropTypes.func,
    toggleNotifications: PropTypes.func,
    updateNotification: PropTypes.func
  }

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

  handleClickOutside = () => {
    this.props.toggleNotifications()
  }

  hasSomeNotifications = () => {
    const { notifications } = this.props
    return notifications.data.length > 0
  }

  showLoading = () => {
    return <li><Loading margin='30px auto' /></li>
  }

  showEmpty = () => {
    return <li className='notificationsEmpty'>
      You have no notifications. <br />
      More time for dancing.
    </li>
  }

  showNotifications = () => {
    const { notifications, updateNotification, toggleNotifications } = this.props
    if (!this.hasSomeNotifications()) {
      return this.showEmpty()
    }
    return notifications.data.slice(0, 10).map(
      n => <Notification notification={n}
        updateNotification={updateNotification}
        key={`notification-${n.id}`}
        onClick={toggleNotifications} />
    ).concat([
      <li key='notification-see-all'>
        <Link to='/notifications' className='notificationsBoxSeeAll' onClick={toggleNotifications}>
          See all
        </Link>
      </li>
    ])
  }

  render = () => {
    const { notifications } = this.props
    return <div className='notificationsBox'>
      <div className='notificationsBoxTriangle' />
      <ul className='notifications'>
        {notifications.data.length === 0 && notifications.isLoading ? this.showLoading() : this.showNotifications()}
      </ul>
    </div>
  }
}

export default onClickOutsideAddon(NotificationBox)
