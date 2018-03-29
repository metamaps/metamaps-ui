import React, { Component } from 'react'

import ContributorList from './ContributorList'

class MapInfo extends Component {
  render = () => {
    const { userId, isCreator, permission, topicCount, synapseCount, relevantPeople } = this.props

    const contributorCount = relevantPeople.length
    let contributorsClass = relevantPeople.length > 1 ? 'multiple' : ''
    contributorsClass += relevantPeople.length === 2 ? ' mTwo' : ''
    const contributorImage = relevantPeople.length > 0 ? relevantPeople.models[0].get('image') : '/images/user.png'

    return (
      <div className="mapInfoStat">
        <div className="infoStatIcon mapContributors hoverForTip">
          <img id="mapContribs" className={contributorsClass}
            width="25" height="25" src={contributorImage} />
          <span className="count">{contributorCount}</span>
          <div className="tip">
            <ContributorList {...{isCreator, relevantPeople, userId}} />
          </div>
        </div>
        <div className="infoStatIcon mapTopics">
          {topicCount}
        </div>
        <div className="infoStatIcon mapSynapses">
          {synapseCount}
        </div>
        <div className={`infoStatIcon mapPermission ${permission} hoverForTip`}>
          {isCreator && <div className='tooltips'>
            As the creator, you can change the permission of this map, and the permission of all the topics and synapses you have authority to change will change as well.
          </div>}
        </div>
        <div className="clearfloat"></div>
      </div>
    )
  }
}

export default MapInfo