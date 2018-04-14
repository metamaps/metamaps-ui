import { connect } from 'react-redux'

import {
  closeUserMenu,
  openInvite
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
    closeUserMenu: () => dispatch(closeUserMenu()),
    openInvite: () => dispatch(openInvite())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
