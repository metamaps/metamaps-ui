import { connect } from 'react-redux'

import Index from '../routes/Index'

function mapStateToProps(state) {
  return {
    currentUserId: 1234
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
