import { connect } from 'react-redux'

import DataVis from '../../components/DataVis'

function nullComponent(props) {
  return null
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(nullComponent)
