import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import { fetchNotifications } from '../actions/models/notifications'
import Notifications from '../routes/Notifications/Notifications'

function mapStateToProps(state) {
  return {
    notifications: select(fetchNotifications(), state.models)
  }
}

function mapDispatchToProps(dispatch)  {
  return {
    /*  approveAccessRequest,
    denyAccessRequest, */
    fetchNotifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
