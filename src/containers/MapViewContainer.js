import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import {
  openMap,
  closeHelp,
  closeImportExport,
  closeForkMap,
  closeMetacodeSetSelect
} from '../actions'
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
    fetchMap: () => dispatch(fetchMapAction(ownProps)),
    dispatch: action => dispatch(action)
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { id } = ownProps.match.params
  const { ui } = stateProps
  const { metacodeSetSelectOpen, forkMapOpen, helpOpen, importExportOpen } = ui || {}
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    closeLightbox: () => {
      if (metacodeSetSelectOpen) return dispatchProps.dispatch(closeMetacodeSetSelect(id))
      else if (forkMapOpen) return dispatchProps.dispatch(closeForkMap(id))
      else if (helpOpen) return dispatchProps.dispatch(closeHelp(id))
      else if (importExportOpen) return dispatchProps.dispatch(closeImportExport(id))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MapView)
