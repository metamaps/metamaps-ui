import React, { Component } from 'react'

import ContributorList from './ContributorList'
import PermissionSelect from './PermissionSelect'

class MapInfo extends Component {
  render = () => {
    const { userId, isCreator, permission, topicCount,
      synapseCount, relevantPeople, selectMapPermission,
      removeCollaborator } = this.props
    return (
      <div className="mapInfoStat">
        <ContributorList {...{isCreator, relevantPeople, userId, removeCollaborator}} />
        <div className="infoStatIcon mapTopics">{topicCount}</div>
        <div className="infoStatIcon mapSynapses">{synapseCount}</div>
        <PermissionSelect {...{permission, isCreator, selectMapPermission}} />
        <div className="clearfloat"></div>
      </div>
    )
  }
}

export default MapInfo
