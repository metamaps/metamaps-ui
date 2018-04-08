import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { find, values } from 'lodash'

import { authorizeToEdit } from '../../authorizing'

const IN_CONVERSATION = 1 // shared with /realtime/reducer.js

const MapperList = (props) => {
  return <ul className='mapperList'>
    <li className='live'>LIVE</li>
    { props.mappers.map(mapper => <li key={ mapper.id } ><img src={ mapper.avatar } /><span>{ mapper.username }</span></li>) }
  </ul>
}

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
    return true
  }

  render = () => {
    const { currentUser, map, onStar, onRequest, onMapFollow } = this.props
    const isFollowing = map.following
    const style = { display: this.state.open ? 'block' : 'none' }

    return <div className='dropdownMenu'>
      <div className='menuToggle' onClick={ this.toggle }>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
      </div>
      <ul className='menuItems' style={ style }>
        <li className='star' onClick={ () => { this.toggle() && onStar(map) }}>Star Map</li>
        { !authorizeToEdit(map, currentUser.id) && <li className='request' onClick={ () => { this.toggle() && onRequest(map) }}>Request Access</li> }
        <li className='follow' onClick={ () => { this.toggle() && onMapFollow(map) }}>{isFollowing ? 'Unfollow' : 'Follow'}</li>
      </ul>
    </div>
  }
}
Menu.propTypes = {
  currentUser: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  onStar: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  onMapFollow: PropTypes.func.isRequired
}

const Metadata = (props) => {
  const { map } = props
  return (<div>
    <div className="metadataSection numTopics">
      <div className="numTopicsIcon"></div>
      { map.topic_ids.length }<br/>
      { map.topic_ids.length === 1 ? 'topic' : 'topics' }
    </div>
    <div className="metadataSection numStars">
      <div className="numStarsIcon"></div>
      TODO<br/>
      { map.star_count === 1 ? 'star' : 'stars' }
    </div>
    <div className="metadataSection numSynapses">
      <div className="numSynapsesIcon"></div>
      { map.synapse_ids.length }<br/>
      { map.synapse_ids.length === 1 ? 'synapse' : 'synapses' }
    </div>
    <div className="metadataSection numContributors">
      <div className="numContributorsIcon"></div>
      { map.contributor_ids.length }<br/>
      { map.contributor_ids.length === 1 ? 'contributor' : 'contributors' }
    </div>
    <div className="clearfloat"></div>
  </div>)
}

const checkAndWrapInA = (shouldWrap, classString, mapId, element) => {
  if (shouldWrap) return <Link className={ classString } to={ `/maps/${mapId}` } >{ element }</Link>
  else return element
}

class MapCard extends Component {
  render = () => {
    const { map, mobile, juntoState, currentUser, onRequest, onStar, onMapFollow } = this.props

    const hasMap = (juntoState.liveMaps[map.id] && values(juntoState.liveMaps[map.id]).length) || null
    const realtimeMap = juntoState.liveMaps[map.id]
    const hasConversation = hasMap && find(values(realtimeMap), v => v === IN_CONVERSATION)
    const hasMapper = hasMap && !hasConversation
    const mapperList = hasMap && Object.keys(realtimeMap).map(id => juntoState.connectedPeople[id])

    const n = map.name
    const d = map.desc || ''

    const maxNameLength = 32
    const maxDescLength = 180
    const truncatedName = n ? (n.length > maxNameLength ? n.substring(0, maxNameLength) + '...' : n) : ''
    const truncatedDesc = d ? (d.length > maxDescLength ? d.substring(0, maxDescLength) + '...' : d) : ''
    const editPermission = authorizeToEdit(map, currentUser.id) ? 'canEdit' : 'cannotEdit'

    return (
      <div className="map" id={ map.id }>
        { checkAndWrapInA(mobile, '', map.id,
          <div className={ 'permission ' + editPermission }>
            <div className='mapCard'>
              <div className='mainContent'>
                { !mobile && <div className='mapScreenshot'>
                  <img src={ map.screenshot } />
                </div> }
                <div className='title' title={ map.name }>
                  <div className='innerTitle'>{ truncatedName }</div>
                </div>
                { mobile && hasMapper && <div className='mobileHasMapper'><MapperList mappers={ mapperList } /></div> }
                { mobile && hasConversation && <div className='mobileHasConversation'><MapperList mappers={ mapperList } /></div> }
                { mobile && d && <div className="desc">{ d }</div> }
                { mobile && <div className='mobileMetadata'><Metadata map={ map } /></div> }
                <div className={`creatorAndPerm ${authorizeToEdit(map, currentUser.id) ? '' : 'cardHasViewOnly'}`}>
                  <img className='creatorImage' src={ map.user.avatar } />
                  <span className='creatorName'>{ map.user.name }</span>
                  { !authorizeToEdit(map, currentUser.id) && <div className='cardViewOnly'>View Only</div> }
                </div>
              </div>
              { !mobile && checkAndWrapInA(true, 'mapMetadata', map.id,
                <div>
                  <Metadata map={ map } />
                  <div className="scroll">
                    <div className="desc">
                      { truncatedDesc }
                      <div className="clearfloat"></div>
                    </div>
                  </div>
                </div>) }
              { !mobile && hasMapper && <div className='mapHasMapper'><MapperList mappers={ mapperList } /></div> }
              { !mobile && hasConversation && <div className='mapHasConversation'><MapperList mappers={ mapperList } /></div> }
              { !mobile && currentUser && <Menu currentUser={ currentUser } map={ map } onStar= { onStar } onRequest={ onRequest } onMapFollow={ onMapFollow } /> }
            </div>
          </div>) }
      </div>
    )
  }
}

MapCard.propTypes = {
  map: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  juntoState: PropTypes.object,
  currentUser: PropTypes.object,
  onStar: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  onMapFollow: PropTypes.func.isRequired
}

export default MapCard
