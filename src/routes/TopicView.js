import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ContextMenu from '../components/ContextMenu'
import DataVis from '../components/DataVis'
import UpperOptions from '../components/UpperOptions'
import InfoAndHelp from '../components/InfoAndHelp'
import VisualizationControls from '../components/VisualizationControls'
import SynapseCard from '../components/SynapseCard'
import TopicCard from '../components/TopicCard'

export default class TopicView extends Component {

  static propTypes = {
    contextMenu: PropTypes.bool,
    mobile: PropTypes.bool,
    topicId: PropTypes.string,
    topic: PropTypes.object,
    filterData: PropTypes.object,
    allForFiltering: PropTypes.object,
    visibleForFiltering: PropTypes.object,
    toggleMetacode: PropTypes.func,
    toggleMapper: PropTypes.func,
    toggleSynapse: PropTypes.func,
    filterAllMetacodes: PropTypes.func,
    filterAllMappers: PropTypes.func,
    filterAllSynapses: PropTypes.func,
    currentUser: PropTypes.object,
    endActiveTopic: PropTypes.func,
    launchNewTopic: PropTypes.func,
    openHelpLightbox: PropTypes.func,
    forkMap: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    openSynapse: PropTypes.object,
    synapseCardPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    synapseCardSynapses: PropTypes.array,
    onSynapseCardMount: PropTypes.func,
    onSynapseDirectionChange: PropTypes.func,
    onSynapsePermissionSelect: PropTypes.func,
    onSynapseSelect: PropTypes.func
  }

  componentWillUnmount() {
    this.endTopic()
  }

  endTopic() {
    this.upperOptions.reset()
    this.props.endActiveTopic()
  }

  componentDidUpdate(prevProps) {
    /*const oldTopicId = prevProps.topicId
    const { topicId, launchNewTopic } = this.props
    if (!oldTopicId && topicId) launchNewTopic(topicId)
    else if (oldTopicId && topicId && oldTopicId !== topicId) {
      this.endTopic()
      launchNewTopic(topicId)
    }
    else if (oldTopicId && !topicId) this.endTopic()*/
  }

  render = () => {
    const { mobile, topic, currentUser, allForFiltering, visibleForFiltering,
            toggleMetacode, toggleMapper, toggleSynapse, filterAllMetacodes,
            filterAllMappers, filterAllSynapses, filterData, forkMap,
            openHelpLightbox, onZoomIn, onZoomOut, contextMenu,
            openTopic, openSynapse, synapseCardSynapses, onSynapseCardMount,
            onSynapseDirectionChange, onSynapsePermissionSelect,
            onSynapseSelect, synapseCardPosition } = this.props
    // TODO: stop using {...this.props} and make explicit
    return <div className="topicWrapper">
      <UpperOptions ref={x => this.upperOptions = x}
                    currentUser={currentUser}
                    topic={topic}
                    onForkClick={forkMap}
                    filterData={filterData}
                    allForFiltering={allForFiltering}
                    visibleForFiltering={visibleForFiltering}
                    toggleMetacode={toggleMetacode}
                    toggleMapper={toggleMapper}
                    toggleSynapse={toggleSynapse}
                    filterAllMetacodes={filterAllMetacodes}
                    filterAllMappers={filterAllMappers}
                    filterAllSynapses={filterAllSynapses} />
      <DataVis />
      {openTopic && <TopicCard {...this.props} />}
      {openSynapse && <SynapseCard synapse={openSynapse}
                                   currentUser={currentUser}
                                   position={synapseCardPosition}
                                   synapses={synapseCardSynapses} 
                                   onCardMount={onSynapseCardMount} 
                                   onDirectionChange={onSynapseDirectionChange} 
                                   onPermissionSelect={onSynapsePermissionSelect} 
                                   onSynapseSelect={onSynapseSelect} />}
      {contextMenu && <ContextMenu {...this.props} />}
      <VisualizationControls onClickZoomIn={onZoomIn}
                             onClickZoomOut={onZoomOut} />
      <InfoAndHelp topic={topic}
                   onHelpClick={openHelpLightbox} />
    </div>
  }
}
