import React, { Component } from 'react'

import ContextMenu from '../containers/componentContainers/ContextMenu'
import DataVis from '../containers/componentContainers/DataVis'
import UpperOptions from '../containers/componentContainers/UpperOptions'
import InfoAndHelp from '../containers/componentContainers/InfoAndHelp'
import Instructions from '../containers/componentContainers/Instructions'
import VisualizationControls from '../containers/componentContainers/VisualizationControls'
import MapChat from '../containers/componentContainers/MapChat'
import TopicCard from '../containers/componentContainers/TopicCard'
import SynapseCard from '../containers/componentContainers/SynapseCard'
import NewTopic from '../containers/componentContainers/NewTopic'
import NewSynapse from '../containers/componentContainers/NewSynapse'

export default class MapView extends Component {
  componentWillMount = () => {
    const { ui, map, fetchMap, openMap } = this.props
    if (map.needsFetch) {
      fetchMap()
    }
    if (!ui) {
      openMap()
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: double check if this is right
    const { map } = nextProps
    const { fetchMap } = this.props
    if (map.needsFetch) {
      fetchMap()
    }
  }

  render = () => {
    const { currentUser, history, location, match } = this.props
    return <div className="mapWrapper">
      <UpperOptions history={history} location={location} match={match} />
      <DataVis history={history} location={location} match={match} />
      {currentUser && <NewTopic history={history} location={location} match={match} />}
      {currentUser && <NewSynapse history={history} location={location} match={match} />}
      <TopicCard history={history} location={location} match={match} />
      <SynapseCard history={history} location={location} match={match} />
      <ContextMenu history={history} location={location} match={match} />
      {currentUser && <Instructions history={history} location={location} match={match} />}
      {currentUser && <MapChat history={history} location={location} match={match} />}
      <VisualizationControls history={history} location={location} match={match} />
      <InfoAndHelp history={history} location={location} match={match} />
    </div>
  }
}
