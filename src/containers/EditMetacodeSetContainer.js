import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import EditMetacodeSet from '../routes/Admin/EditMetacodeSet'

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
  const {
    updateMetacodeSet
  } = ReactApp.getCallbackProps()

  return {
    updateMetacodeSet
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMetacodeSet)

