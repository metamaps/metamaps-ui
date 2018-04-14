import { connect } from 'react-redux'

import ImportDialogBox from '../../components/ImportDialogBox'

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
