import { connect } from 'react-redux'

import {
  closeUserMenu
} from '../../actions'
import UserMenu from '../../components/UserMenu'

function mapStateToProps(state, ownProps) {
  return {
    currentUser: {
      id: 1,
      avatar: '/images/user.png'
    }
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    closeUserMenu: () => dispatch(closeUserMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
