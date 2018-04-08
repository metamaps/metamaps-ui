import React, { Component } from 'react'

import onClickOutsideAddon from 'react-onclickoutside'

class PermissionSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  togglePermissionSelect = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleClickOutside = () => {
    this.setState({
      open: false
    })
  }

  render = () => {
    const { isCreator, permission, selectMapPermission } = this.props
    const classes = `infoStatIcon mapPermission hoverForTip ${permission} ${this.state.open ? 'minimize' : ''}`

    const toCommons = <li key="1" className="commons" onClick={() => selectMapPermission('commons')}></li>
    const toPublic = <li key="2" className="public" onClick={() => selectMapPermission('public')}></li>
    const toPrivate = <li key="3" className="private" onClick={() => selectMapPermission('private')}></li>
    let permissionSelect
    if (permission === 'commons') {
      permissionSelect = <ul className="permissionSelect">
        {[toPublic, toPrivate]}
      </ul>
    } else if (permission === 'public') {
      permissionSelect = <ul className="permissionSelect">
        {[toCommons, toPrivate]}
      </ul>
    } else if (permission === 'private') {
      permissionSelect = <ul className="permissionSelect">
        {[toCommons, toPublic]}
      </ul>
    }

    return (
      <div onClick={this.togglePermissionSelect}
        className={classes}>
        {isCreator && <div className='tooltips'>
          As the creator, you can change the permission of this map, and the permission of all the topics and synapses you have authority to change will change as well.
        </div>}
        {this.state.open && permissionSelect}
      </div>
    )
  }
}

export default onClickOutsideAddon(PermissionSelect)
