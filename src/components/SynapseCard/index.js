import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SynapseDesc from './SynapseDesc'
import SynapseDirection from './SynapseDirection'
import SynapseSelect from './SynapseSelect'
import Permission from '../TopicCard/Permission'

class SynapseCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectIsOpen: false
    }
  }
  componentDidMount= () => {
    //this.props.onCardMount()
  }

  toggleSelect = () => {
    this.setState({
      selectIsOpen: !this.state.selectIsOpen
    })
  }

  closeSelect = () => {
    this.setState({
      selectIsOpen: false
    })
  }

  onSynapseSelect = (index) => {
    this.closeSelect()
    this.props.onSynapseSelect(index)
  }

  render = () => {
    const { currentUser, synapse, synapses, 
            position, onPermissionSelect,
            onDirectionChange } = this.props
    const { selectIsOpen } = this.state
    const canEdit = synapse.authorizeToEdit(currentUser)
    const canEditPerm = synapse.authorizePermissionChange(currentUser)
    const permission = synapse.get('permission')
    let className
    if (canEdit) {
      className = 'permission canEdit'
      className += synapse.authorizePermissionChange(currentUser) ? ' yourEdge' : ''
    } else {
      className = 'permission cannotEdit'
    }
    const style = {
      position: 'absolute',
      left: position.x,
      top: position.y
    }
    return (
      <div className={className} id="edit_synapse" style={style}>
        <div id="editSynUpperBar">
          <div id="synapseCardCount">{ synapses.length }</div>
          <SynapseDesc id={synapse.id} desc={synapse.get('desc')} canEdit={canEdit} />
          {synapses.length > 1 && <div id="dropdownSynapses" onClick={this.toggleSelect}></div>}
        </div>
        <div id="editSynLowerBar">
          {synapses.length > 1 && selectIsOpen && <SynapseSelect synapse={synapse} synapses={synapses} onSynapseSelect={this.onSynapseSelect} />}
          <div id="edgeUser" className="hoverForTip">
            <Link to={`/explore/mapper/${synapse.get('user_id')}`}>
              <img src={synapse.get('user_image')} width="24" height="24" />
            </Link>
            <div className="tip">{synapse.get('user_name')}</div>
          </div>
          <Permission authorizedToEdit={canEditPerm} permission={permission} permissionSelected={onPermissionSelect} />
          <SynapseDirection canEdit={canEdit} onDirectionChange={onDirectionChange} synapse={synapse} />
        </div>
      </div>
    )
  }
}

export default SynapseCard