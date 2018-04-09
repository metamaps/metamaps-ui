import { connect } from 'react-redux'

import {
  closeFilters
} from '../../actions'
import FilterBox from '../../components/FilterBox'

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params
  return {
    closeFilters: () => dispatch(closeFilters(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox)
