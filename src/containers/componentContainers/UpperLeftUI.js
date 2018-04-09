import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import { fetchMapAction } from '../../selectors/map'
import UpperLeftUI from '../../components/UpperLeftUI'

function mapStateToProps(state, ownProps) {
  // TODO
  return {
    currentUser: {
      id: 1
    },
    map: ownProps.location.pathname.startsWith('/maps') && select(fetchMapAction(ownProps), state.models),
    userRequested: false,
    requestAnswered: false,
    requestApproved: false
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  // TODO
  return {
    onRequestClick: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpperLeftUI)
