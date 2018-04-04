import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import NewMetacode from '../routes/Admin/NewMetacode'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch)  {
  const {
    createMetacode
  } = ReactApp.getCallbackProps()

  return {
    createMetacode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMetacode)

