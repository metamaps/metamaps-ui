import { connect } from 'react-redux'

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
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMobile: val => dispatch(setMobile(val)),
    setMobileTitleWidth: val => dispatch(setMobileTitleWidth(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
