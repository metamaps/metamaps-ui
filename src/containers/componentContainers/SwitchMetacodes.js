import { connect } from 'react-redux'

import SwitchMetacodes from '../../components/SwitchMetacodes'

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
