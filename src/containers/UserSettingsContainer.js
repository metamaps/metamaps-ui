import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import UserSettings from '../routes/UserSettings'

function mapStateToProps(state) {
  const {
    currentUser
  } = state

  return {
    currentUser
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    updateUser
  } = ReactApp.getCallbackProps()

  return {
    updateUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)

