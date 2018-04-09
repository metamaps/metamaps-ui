import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import {
  toggleNotifications
} from '../../actions'
import {
  fetchNotifications,
  updateNotification
} from '../../actions/models/notifications'
import NotificationBox from '../../components/NotificationBox'

function mapStateToProps(state, ownProps) {
  return {
    notifications: select(fetchNotifications(), state.models)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleNotifications: () => dispatch(toggleNotifications()),
    fetchNotifications: () => dispatch(fetchNotifications()),
    updateNotification: (id, data) => dispatch(updateNotification(id, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBox)
