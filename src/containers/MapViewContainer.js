import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import { openMap } from '../actions'
import { fetchMapAction } from '../selectors/map'
import MapView from '../routes/MapView'

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  return {
    map: select(fetchMapAction(ownProps), state.models),
    ui: state.ui.maps[id],
    juntoState: state.juntoState
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params
  return {
    openMap: () => dispatch(openMap(id)),
    fetchMap: () => dispatch(fetchMapAction(ownProps))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
