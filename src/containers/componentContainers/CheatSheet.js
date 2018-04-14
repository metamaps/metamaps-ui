import { connect } from 'react-redux'

import CheatSheet from '../../components/CheatSheet'

function nullComponent(props) {
  return null
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(nullComponent)
