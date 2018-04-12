import { connect } from 'react-redux'

import {
  toggleUserMenu
} from '../../actions'
import { createMap } from '../../actions/models/maps'
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
    toggleUserMenu: () => dispatch(toggleUserMenu()),
    createMap: (map) => {
      dispatch(createMap(map, {
        access_token: '6h88aWgkHYefZYLbN8J2IaY54qAI3Brz'
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpperRightUI)
