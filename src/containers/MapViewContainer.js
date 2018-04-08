import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import { openMap } from '../actions'
import { fetchMap } from '../actions/models/maps'
import MapView from '../routes/MapView'

function makeFetchMapParams(ownProps) {
  return {
    // user_id: 1234
    embed: 'user,topics,synapses,mappings,contributors,collaborators'
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  const fetchMapParams = makeFetchMapParams(ownProps)
  return {
    map: select(fetchMap(id, fetchMapParams), state.models),
    ui: state.ui.maps[id],
    juntoState: state.juntoState
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params
  const fetchMapParams = makeFetchMapParams(ownProps)
  return {
    openMap: () => dispatch(openMap(id)),
    fetchMap: () => dispatch(fetchMap(id, fetchMapParams))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
