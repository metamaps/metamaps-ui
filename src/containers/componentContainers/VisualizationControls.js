import { connect } from 'react-redux'

import {
  centerView,
  zoomIn,
  zoomOut
} from '../../actions'
import VisualizationControls from '../../components/VisualizationControls'

function mapStateToProps(state, ownProps) {
  return {
    isMap: ownProps.location.pathname.includes('/maps')
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {match: {params: { id }}} = ownProps
  return {
    onClickZoomExtents: () => dispatch(centerView(id)),
    onClickZoomIn: () => dispatch(zoomIn(id)),
    onClickZoomOut: () => dispatch(zoomOut(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationControls)
