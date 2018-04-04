import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import Metacodes from '../routes/Admin/Metacodes'

function mapStateToProps(state) {
  return {
    metacodes: state.metacodes
  }
}

function mapDispatchToProps(dispatch)  {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Metacodes)

