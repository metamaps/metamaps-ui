import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import RequestAccess from '../routes/RequestAccess'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch)  {
  const {
    requestAccess
  } = ReactApp.getCallbackProps()

  return {
    requestAccess
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestAccess)

