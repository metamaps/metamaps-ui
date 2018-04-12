import { connect } from 'react-redux'
import { selectActionStatus, clearActionStatus } from 'redux-crud-store'

import {
  setMobile,
  setMobileTitleWidth
} from '../actions'
import App from '../routes/App'

function mapStateToProps(state) {
  return {
    mobile: state.ui.mobile,
    currentUser: {
      id: 1
    },
    createStatus: selectActionStatus('maps', state.models, 'create')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMobile: val => dispatch(setMobile(val)),
    setMobileTitleWidth: val => dispatch(setMobileTitleWidth(val)),
    clearCreateStatus: () => dispatch(clearActionStatus('maps', 'create'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
