import { connect } from 'react-redux'
import { select } from 'redux-crud-store'

import { openTopic } from '../actions'
import { fetchTopic } from '../actions/models/topics'
import TopicView from '../routes/TopicView'

function makeFetchTopicParams(ownProps) {
  return {
    // user_id: 1234
    embed: 'user'
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  const fetchTopicParams = makeFetchTopicParams(ownProps)
  return {
    topic: select(fetchTopic(id, fetchTopicParams), state.models),
    ui: state.ui.topics[id]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params
  const fetchTopicParams = makeFetchTopicParams(ownProps)
  return {
    openTopic: () => dispatch(openTopic(id)),
    fetchTopic: () => dispatch(fetchTopic(id, fetchTopicParams))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicView)
