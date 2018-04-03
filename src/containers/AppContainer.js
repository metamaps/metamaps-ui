import { connect } from 'react-redux'
import { find as _find } from 'lodash'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import App from '../routes/App'

function mapStateToProps(state) {
  const {
    currentUser,
    toast,
    unreadNotificationCount,
    mobile,
    mobileTitle,
    mobileTitleWidth,
    map,
    requests,
    serverData,
    notifications,
    notificationsLoading,
    metacodes,
    selectedMetacodes,
    metacodeSets
  } = state

  const request = currentUser && _find(requests, r => r.user_id === currentUser.id)
  const userRequested = !!request
  const requestAnswered = request && request.answered
  const requestApproved = request && request.approved

  return {
    currentUser,
    toast,
    unreadNotificationCount,
    mobile,
    mobileTitle,
    mobileTitleWidth,
    map,
    userRequested,
    requestAnswered,
    requestApproved,
    requests,
    serverData,
    notifications,
    notificationsLoading,
    metacodes,
    selectedMetacodes,
    metacodeSets
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    onMetacodeSetSelectMount,
    onSetSelect,
    onExport,
    downloadScreenshot,
    importHandleFile,
    markAsRead,
    markAsUnread,
    fetchNotifications,
    onRequestAccess,
    openInviteLightbox
  } = ReactApp.getCallbackProps()

  return {
    onMetacodeSetSelectMount,
    onSetSelect,
    onExport,
    downloadScreenshot,
    importHandleFile,
    markAsRead,
    markAsUnread,
    fetchNotifications,
    onRequestAccess,
    openInviteLightbox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

