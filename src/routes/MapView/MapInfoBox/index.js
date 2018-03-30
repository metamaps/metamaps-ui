import React, { Component } from 'react'
import PropTypes from 'prop-types'

import onClickOutsideAddon from 'react-onclickoutside'

import MapName from './MapName'
import MapInfo from './MapInfo'
import MapDesc from './MapDesc'
import MapMeta from './MapMeta'

class MapInfoBox extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    map: PropTypes.object,
    isNewMap: PropTypes.bool,
    toggleInfoBox: PropTypes.func,
    selectMapPermission: PropTypes.func,
    deleteActiveMap: PropTypes.func
  }

  handleClickOutside = () => {
    this.props.toggleInfoBox("close")
  }

  render = () => {
    const { currentUser, map, isNewMap, selectMapPermission, deleteActiveMap, updateThumbnail } = this.props
    if (!map) return null
    const id = map.id
    const relevantPeople = [] // TODO: permission === 'commons' ? DataModel.Mappers : DataModel.Collaborators
    const userId = currentUser && currentUser.id
    const userName = isCreator ? 'You' : map.get('user_name')
    const name = map.get('name')
    const desc = map.get('desc')
    const permission = map.get('permission')
    const topicCount = map.get('topic_count')
    const synapseCount = map.get('synapse_count')
    const isCreator = map.authorizePermissionChange(currentUser)
    const canEdit = map.authorizeToEdit(currentUser)
    const shareable = permission !== 'private'
    const createdAt = map.get('created_at_clean')
    const updatedAt = map.get('updated_at_clean')

    let classes = 'mapInfoBox mapElement mapElementHidden permission '
    classes += isCreator ? 'yourMap' : ''
    classes += canEdit ? ' canEdit' : ''
    classes += isNewMap ? ' mapRequestTitle' : ''

    return <div className={classes}>
      <MapName canEdit={canEdit} id={map.id} name={map.get('name')} />
      <MapInfo {...{isCreator, permission, topicCount, synapseCount, relevantPeople, userId, selectMapPermission}} />
      <MapDesc {...{canEdit, id, desc}} />
      <MapMeta {...{userName, createdAt, updatedAt, deleteActiveMap, updateThumbnail}} />
    </div>
  }
}

export default onClickOutsideAddon(MapInfoBox)
