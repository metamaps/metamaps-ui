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
    onSynapseSelect: PropTypes.func,
    metacodeSets: PropTypes.array,
    contextMenu: PropTypes.bool,
    contextNode: PropTypes.object,
    contextEdge: PropTypes.object,
    contextPos: PropTypes.object,
    contextFetchingSiblingsData: PropTypes.bool,
    contextSiblingsData: PropTypes.object,
    contextDelete: PropTypes.func,
    contextRemove: PropTypes.func,
    contextHide: PropTypes.func,
    contextCenterOn: PropTypes.func,
    contextPopoutTopic: PropTypes.func,
    contextUpdatePermissions: PropTypes.func,
    contextOnMetacodeSelect: PropTypes.func,
    contextFetchSiblings: PropTypes.func,
    contextPopulateSiblings: PropTypes.func
  }

  componentWillUnmount() {
    this.endTopic()
  }

  endTopic() {
    this.upperOptions.reset()
    this.props.endActiveTopic()
  }

  componentDidUpdate(prevProps) {
    const oldTopicId = prevProps.match.params.id
    const { match:{params:{ id }}, launchNewTopic } = this.props
    if (!oldTopicId && id) launchNewTopic(parseInt(id, 10))
    else if (oldTopicId && id && oldTopicId !== id) {
      this.endTopic()
      launchNewTopic(parseInt(id, 10))
    }
    else if (oldTopicId && !id) this.endTopic()
  }

  render = () => {
    const { mobile, map, topic, currentUser, allForFiltering, visibleForFiltering,
            toggleMetacode, toggleMapper, toggleSynapse, filterAllMetacodes,
            filterAllMappers, filterAllSynapses, filterData, forkMap,
            openHelpLightbox, onZoomIn, onZoomOut, contextMenu,
            openTopic, openSynapse, synapseCardSynapses, onSynapseCardMount,
            onSynapseDirectionChange, onSynapsePermissionSelect,
            onSynapseSelect, synapseCardPosition,
            redrawCanvas, metacodeSets, updateTopic,
            onTopicFollow, contextNode,
            contextEdge, contextPos, contextFetchingSiblingsData,
            contextSiblingsData, contextDelete, contextRemove, contextHide, contextCenterOn,
            contextPopoutTopic, contextUpdatePermissions, contextOnMetacodeSelect,
            contextFetchSiblings, contextPopulateSiblings } = this.props
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
      {openTopic && <TopicCard currentUser={currentUser}
                               onTopicFollow={onTopicFollow}
                               updateTopic={updateTopic}
                               metacodeSets={metacodeSets}
                               redrawCanvas={redrawCanvas}
                               topic={openTopic} />}
      {openSynapse && <SynapseCard synapse={openSynapse}
                                   currentUser={currentUser}
                                   position={synapseCardPosition}
                                   synapses={synapseCardSynapses} 
                                   onCardMount={onSynapseCardMount} 
                                   onDirectionChange={onSynapseDirectionChange} 
                                   onPermissionSelect={onSynapsePermissionSelect} 
                                   onSynapseSelect={onSynapseSelect} />}
      {contextMenu && <ContextMenu metacodeSets={metacodeSets}
                                   currentUser={currentUser}
                                   map={map}
                                   topic={topic}
                                   contextNode={contextNode}
                                   contextEdge={contextEdge}
                                   contextFetchingSiblingsData={contextFetchingSiblingsData}
                                   contextSiblingsData={contextSiblingsData}
                                   contextPos={contextPos}
                                   contextDelete={contextDelete}
                                   contextRemove={contextRemove}
                                   contextHide={contextHide}
                                   contextCenterOn={contextCenterOn}
                                   contextPopoutTopic={contextPopoutTopic}
                                   contextUpdatePermissions={contextUpdatePermissions}
                                   contextOnMetacodeSelect={contextOnMetacodeSelect}
                                   contextFetchSiblings={contextFetchSiblings}
                                   contextPopulateSiblings={contextPopulateSiblings} />}
      <VisualizationControls onClickZoomIn={onZoomIn}
                             onClickZoomOut={onZoomOut} />
      <InfoAndHelp topic={topic}
                   onHelpClick={openHelpLightbox} />
    </div>
  }
}
