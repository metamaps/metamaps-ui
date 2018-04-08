import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import Header from './Header'
import MapperCard from './MapperCard'
import MapCard from './MapCard'
import LoadingPage from '../helpers/LoadingPage'

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
    mapsWidth: PropTypes.number,
    mobile: PropTypes.bool
  }

  static contextTypes = {
    location: PropTypes.object
  }

  componentWillMount = () => {
    const { maps, fetchMaps } = this.props
    if (maps.needsFetch) {
      fetchMaps()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { maps } = nextProps
    const { fetchMaps } = this.props
    if (maps.needsFetch) {
      fetchMaps()
    }
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

  render = () => {
    const { mobile, maps, mapsWidth, currentUser, juntoState, section, user, onStar, onRequest, onMapFollow } = this.props
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
            { currentUser && !user ? <div className="map newMap"><a href="/maps/new"><div className="newMapImage"></div><span>Create new map...</span></a></div> : null }
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
