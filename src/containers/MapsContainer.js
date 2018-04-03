import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import Maps from '../routes/Maps'

function mapStateToProps(state) {
  const {
    maps,
    section,
    moreToLoad,
    juntoState,
    user,
    currentUser,
    mapsWidth,
    pending,
    mobile
  } = state

  return {
    maps,
    section,
    moreToLoad,
    juntoState,
    user,
    currentUser,
    mapsWidth,
    pending,
    mobile
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    loadMore,
    onStar,
    onRequest,
    onMapFollow
  } = ReactApp.getCallbackProps()

  return {
    loadMore,
    onStar,
    onRequest,
    onMapFollow
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps)