import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LoginForm from './LoginForm'

import UserMenu from '../containers/componentContainers/UserMenu'
import NotificationIcon from '../containers/componentContainers/NotificationIcon'
import NotificationBox from '../containers/componentContainers/NotificationBox'

class UpperRightUI extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    signInPage: PropTypes.bool,
    userMenuOpen: PropTypes.bool,
    notificationsOpen: PropTypes.bool,
    toggleUserMenu: PropTypes.func
  }

  createMap = () => {
    const { createMap } = this.props
    createMap({
      name: 'Untitled Map',
      permission: 'public',
      arranged: false
    })
  }

  render() {
    const { currentUser, signInPage, toggleUserMenu,
      notificationsOpen, userMenuOpen } = this.props
    return <div className="upperRightUI">
      {currentUser && <div onClick={this.createMap} className="addMap upperRightEl upperRightIcon">
        <div className="tooltipsUnder">
          Create New Map
        </div>
      </div>}
      {currentUser && <span id="notification_icon">
        <NotificationIcon />
        {notificationsOpen && <NotificationBox />}
      </span>}
      {!signInPage && <div className="sidebarAccount upperRightEl">
        <div className="sidebarAccountIcon ignore-react-onclickoutside" onClick={toggleUserMenu}>
          <div className="tooltipsUnder">Account</div>
          {currentUser && <img src={currentUser.avatar} />}
          {!currentUser && 'SIGN IN'}
          {!currentUser && <div className="accountInnerArrow"></div>}
        </div>
        {userMenuOpen && <div className="sidebarAccountBox upperRightBox">
          {currentUser
            ? <UserMenu />
            : <LoginForm />}
        </div>}
      </div>}
      <div className="clearfloat"></div>
    </div>
  }
}

export default UpperRightUI
