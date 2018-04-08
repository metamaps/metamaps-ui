import React, { Component } from 'react'

import ContextMenu from '../containers/componentContainers/ContextMenu'
import DataVis from '../containers/componentContainers/DataVis'
import UpperOptions from '../containers/componentContainers/UpperOptions'
import InfoAndHelp from '../containers/componentContainers/InfoAndHelp'
import VisualizationControls from '../containers/componentContainers/VisualizationControls'
import TopicCard from '../containers/componentContainers/TopicCard'
import SynapseCard from '../containers/componentContainers/SynapseCard'

export default class TopicView extends Component {
  componentWillMount = () => {
    const { ui, topic, fetchTopic, openTopic } = this.props
    if (topic.needsFetch) {
      fetchTopic()
    }
    if (!ui) {
      openTopic()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { topic } = nextProps
    const { fetchTopic } = this.props
    if (topic.needsFetch) {
      fetchTopic()
    }
  }

  render = () => {
    const { history, location, match } = this.props
    return <div className="topicWrapper">
      <UpperOptions history={history} location={location} match={match} />
      <DataVis history={history} location={location} match={match} />
      <TopicCard history={history} location={location} match={match} />
      <SynapseCard history={history} location={location} match={match} />
      <ContextMenu history={history} location={location} match={match} />
      <VisualizationControls history={history} location={location} match={match} />
      <InfoAndHelp history={history} location={location} match={match} />
    </div>
  }
}
