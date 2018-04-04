import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import MetacodeSets from '../routes/Admin/MetacodeSets'

function mapStateToProps(state) {
  const {
    metacodeSets,
    metacodes
  } = state

  return {
    metacodeSets,
    metacodes
  }
}

function mapDispatchToProps(dispatch)  {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MetacodeSets)

