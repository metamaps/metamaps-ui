import { connect } from 'react-redux'
import { selectActionStatus, clearActionStatus } from 'redux-crud-store'

import {
  setMobile,
  setMobileTitleWidth,
  closeAbout,
  closeInvite,
  closeNoIe,
  closeTutorial
} from '../actions'
import App from '../routes/App'

function mapStateToProps(state) {
  return {
    mobile: state.ui.mobile,
    aboutOpen: state.ui.aboutOpen,
    inviteOpen: state.ui.inviteOpen,
    tutorialOpen: state.ui.tutorialOpen,
    noIeOpen: state.ui.noIeOpen,
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
    clearCreateStatus: () => dispatch(clearActionStatus('maps', 'create')),
    dispatch: action => dispatch(action)
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { aboutOpen, inviteOpen, tutorialOpen, noIeOpen } = stateProps
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    closeLightbox: () => {
      if (aboutOpen) return dispatchProps.dispatch(closeAbout())
      else if (inviteOpen) return dispatchProps.dispatch(closeInvite())
      else if (tutorialOpen) return dispatchProps.dispatch(closeTutorial())
      else if (noIeOpen) return dispatchProps.dispatch(closeNoIe())
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
