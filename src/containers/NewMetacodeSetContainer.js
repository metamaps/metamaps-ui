import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import NewMetacodeSet from '../routes/Admin/NewMetacodeSet'

function mapStateToProps(state) {
  const {
    metacodes
  } = state

  return {
    metacodes
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    createMetacodeSet
  } = ReactApp.getCallbackProps()

  return {
    createMetacodeSet
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMetacodeSet)

