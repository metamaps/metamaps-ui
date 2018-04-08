import { connect } from 'react-redux'

import Toast from '../../components/Toast'

function mapStateToProps(state, ownProps) {
  return {
    toast: state.ui.toast
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
