import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import { fetchMaps } from '../actions/models/maps'
import Maps from '../routes/Maps'

function makeFetchMapParams(ownProps) {
  return {
    // user_id: 1234
    embed: 'user'
  }
}

function mapStateToProps(state, ownProps) {
  const { pathname } = ownProps.location
  // which maps are selected here depends on which
  // section of the maps are being viewed
  const fetchMapParams = makeFetchMapParams(ownProps)
  return {
    maps: select(fetchMaps(fetchMapParams), state.models),
    juntoState: state.juntoState,
    mobile: false, // TODO,
    currentUser: {
      id: 1
    },
    section: pathname === '/' ? 'active' : pathname.split('/')[2]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const fetchMapParams = makeFetchMapParams(ownProps)
  return {
    fetchMaps: () => {
      dispatch(fetchMaps(fetchMapParams))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps)
