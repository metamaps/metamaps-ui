import { connect } from 'react-redux'

import {
  toggleNotifications
} from '../../actions'
import NotificationIcon from '../../components/NotificationIcon'

function mapStateToProps(state, ownProps) {
  return {
    unreadNotificationCount: state.ui.unreadNotificationCount
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleNotifications: () => dispatch(toggleNotifications())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon)
