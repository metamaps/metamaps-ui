import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import onClickOutsideAddon from 'react-onclickoutside'

class UserMenu extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    openInvite: PropTypes.func,
    closeUserMenu: PropTypes.func
  }

  handleClickOutside = () => {
    this.props.closeUserMenu()
  }

  render() {
    // TODO: logout
    const { currentUser, openInvite } = this.props
    return <div>
      <img className="sidebarAccountImage" src={currentUser.avatar} width="48" height="48" />
      <h3 className="accountHeader">{currentUser.name}</h3>
      <ul>
        <li className="accountListItem accountSettings">
          <div className="accountIcon"></div>
          <Link to={`/users/${currentUser.id}/edit`}>Settings</Link>
        </li>
        <li className="accountListItem accountAdmin">
          <div className="accountIcon"></div>
          <Link to="/metacodes">Admin</Link>
        </li>
        <li className="accountListItem accountApps">
          <div className="accountIcon"></div>
          <Link to="/oauth/authorized_applications">Apps</Link>
        </li>
        <li className="accountListItem accountInvite" onClick={openInvite}>
          <div className="accountIcon"></div>
          <span>Share Invite</span>
        </li>
        <li className="accountListItem accountLogout">
          <div className="accountIcon"></div>
          <a id="Logout" href="/logout">Sign Out</a>
        </li>
      </ul>
    </div>
  }
}

export default onClickOutsideAddon(UserMenu)
