import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import Notifications from '../routes/Notifications/Notifications'

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    approveAccessRequest,
    denyAccessRequest,
    fetchNotifications
  } = ReactApp.getCallbackProps()

  return {
    approveAccessRequest,
    denyAccessRequest,
    fetchNotifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

