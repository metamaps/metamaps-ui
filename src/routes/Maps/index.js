import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import Header from './Header'
import MapperCard from './MapperCard'
import MapCard from './MapCard'
import LoadingPage from '../helpers/LoadingPage'
import {
  MAP_WIDTH,
  MOBILE_VIEW_BREAKPOINT,
  MOBILE_VIEW_PADDING,
  MAX_COLUMNS
} from '../../constants'

class Maps extends Component {
  static propTypes = {
    section: PropTypes.string,
    maps: PropTypes.object,
    juntoState: PropTypes.object,
    moreToLoad: PropTypes.bool,
    user: PropTypes.object,
    currentUser: PropTypes.object,
    loadMore: PropTypes.func,
    pending: PropTypes.bool,
    onStar: PropTypes.func,
    onRequest: PropTypes.func,
    onMapFollow: PropTypes.func,
    mobile: PropTypes.bool
  }

  static contextTypes = {
    location: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      mapsWidth: 0
    }
  }

  componentWillMount = () => {
    const { maps, fetchMaps } = this.props
    if (maps.needsFetch) {
      fetchMaps()
    }
    window && window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.maps.data.length !== this.props.maps.data.length) {
      this.resize()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { maps } = nextProps
    const { fetchMaps } = this.props
    if (maps.needsFetch) {
      fetchMaps()
    }
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const { maps, user, currentUser } = this.props
    const numCards = maps.data.length + (user || currentUser ? 1 : 0)
    const mapSpaces = Math.floor(document.body.clientWidth / MAP_WIDTH)
    const mapsWidth = document.body.clientWidth <= MOBILE_VIEW_BREAKPOINT
      ? document.body.clientWidth - MOBILE_VIEW_PADDING
      : Math.min(MAX_COLUMNS, Math.min(numCards, mapSpaces)) * MAP_WIDTH
    this.setState({
      mapsWidth
    })
  }

  mapsDidMount = (node) => {
    if (node) {
      this.mapsDiv = node
      node.addEventListener('scroll', throttle(this.scroll, 500, { leading: true, trailing: false }))
    }
  }

  scroll = () => {
    const { loadMore, moreToLoad, pending } = this.props
    const { mapsDiv } = this
    if (moreToLoad && !pending && mapsDiv.scrollTop + mapsDiv.offsetHeight > mapsDiv.scrollHeight - 300) {
      loadMore()
    }
  }

  createMap = () => {
    const { createMap } = this.props
    createMap({
      name: 'Untitled Map',
      permission: 'public',
      arranged: false
    })
  }

  render = () => {
    const { mobile, maps, currentUser, juntoState, section, user, onStar, onRequest, onMapFollow } = this.props
    const { mapsWidth } = this.state
    const style = { width: mapsWidth + 'px' }

    if (maps.isLoading) {
      return (
        <div>
          <LoadingPage />
          <Header signedIn={ !!currentUser }
            section={ section }
            user={ user }
          />
        </div>
      )
    }

    return (
      <div>
        <div id='exploreMaps' ref={this.mapsDidMount}>
          <div style={ style }>
            { user ? <MapperCard user={ user } /> : null }
            { currentUser && !user ? <div className="map newMap" onClick={this.createMap}><div className="newMapImage"></div><span>Create new map...</span></div> : null }
            { maps.data.map(map => <MapCard key={ map.id } map={ map } mobile={ mobile } juntoState={ juntoState } currentUser={ currentUser } onStar={ onStar } onRequest={ onRequest } onMapFollow={ onMapFollow } />) }
            <div className='clearfloat'></div>
          </div>
        </div>
        <Header signedIn={ !!currentUser }
          section={ section }
          user={ user }
        />
      </div>
    )
  }
}

export default Maps
