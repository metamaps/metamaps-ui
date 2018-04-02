import ReactApp from '../Metamaps/GlobalUI/ReactApp'

function mapStateToProps(state) {
  const {
    currentUser,
    toast,
    unreadNotificationsCount,
    mobile,
    mobileTitle,
    mobileTitleWidth,
    map,
    userRequested,
    requestAnswered,
    requestApproved,
    serverData,
    notifications,
    notificationsLoading,
    metacodes,
    selectedMetacodes,
    metacodeSets
  } = state

  return {
    currentUser,
    toast,
    unreadNotificationsCount,
    mobile,
    mobileTitle,
    mobileTitleWidth,
    map,
    userRequested,
    requestAnswered,
    requestApproved,
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

export default {
  mapStateToProps,
  mapDispatchToProps
}

