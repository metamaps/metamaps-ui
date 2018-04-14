import { connect } from 'react-redux'

import ForkMap from '../../components/ForkMap'

function nullComponent(props) {
  return <div>hi</div>
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(nullComponent)
