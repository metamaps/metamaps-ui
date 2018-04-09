import { connect } from 'react-redux'

import {
  toggleUserMenu
} from '../../actions'
import UpperRightUI from '../../components/UpperRightUI'

function mapStateToProps(state, ownProps) {
  return {
    currentUser: {
      id: 1,
      avatar: '/images/user.png'
    },
    signInPage: ownProps.location.pathname === '/login',
    notificationsOpen: state.ui.notificationsOpen,
    userMenuOpen: state.ui.userMenuOpen
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleUserMenu: () => dispatch(toggleUserMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpperRightUI)
