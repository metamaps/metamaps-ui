import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import {
  toggleFilters
} from '../../actions'
import { fetchMapAction } from '../../selectors/map'
import UpperOptions from '../../components/UpperOptions'

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  const isMap = ownProps.location.pathname.startsWith('/maps')
  let ui
  if (isMap) {
    ui = state.ui.maps[id]
  } else {
    ui = state.ui.topics[id]
  }
  return {
    currentUser: {
      id: 1
    },
    map: isMap && select(fetchMapAction(ownProps), state.models),
    isMap,
    filtersOpen: ui.filtersOpen,
    location: ownProps.location,
    history: ownProps.history,
    match: ownProps.match
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params
  return {
    onForkClick: () => {},
    toggleFilters: () => dispatch(toggleFilters(id)),
    onImportClick: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpperOptions)
