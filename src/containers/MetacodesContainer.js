import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import Metacodes from '../routes/Admin/Metacodes'

function mapStateToProps(state) {
  const {
    
  } = state

  return {
    
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    
  } = ReactApp.getCallbackProps()

  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Metacodes)

