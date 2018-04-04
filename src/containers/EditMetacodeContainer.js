import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import EditMetacode from '../routes/Admin/EditMetacode'

function mapStateToProps(state) {
  return {
    metacodes: state.metacodes
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    updateMetacode
  } = ReactApp.getCallbackProps()

  return {
    updateMetacode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMetacode)

