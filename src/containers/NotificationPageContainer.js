import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import NotificationPage from '../routes/Notifications/NotificationPage'

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    approveAccessRequest,
    denyAccessRequest,
    fetchNotification
  } = ReactApp.getCallbackProps()

  return {
    approveAccessRequest,
    denyAccessRequest,
    fetchNotification
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)

