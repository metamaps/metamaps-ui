import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import { fetchMaps } from '../actions/models/maps'
import Maps from '../routes/Maps'

function makeFetchMapsParams(ownProps) {
  return {
    // user_id: 1234
    embed: 'user'
  }
}

function mapStateToProps(state, ownProps) {
  const { pathname } = ownProps.location
  // which maps are selected here depends on which
  // section of the maps are being viewed
  const fetchMapsParams = makeFetchMapsParams(ownProps)
  return {
    maps: select(fetchMaps(fetchMapsParams), state.models),
    juntoState: state.juntoState,
    mobile: false, // TODO,
    currentUser: {
      id: 1
    },
    section: pathname === '/' ? 'active' : pathname.split('/')[2]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const fetchMapParams = makeFetchMapsParams(ownProps)
  return {
    fetchMaps: () => {
      dispatch(fetchMaps(fetchMapParams))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps)
