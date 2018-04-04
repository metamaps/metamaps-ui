import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ContextMenu from '../components/ContextMenu'
import DataVis from '../components/DataVis'
import UpperOptions from '../components/UpperOptions'
import InfoAndHelp from '../components/InfoAndHelp'
import Instructions from '../components/Instructions'
import VisualizationControls from '../components/VisualizationControls'
import MapChat from '../components/MapChat'
import TopicCard from '../components/TopicCard'
import SynapseCard from '../components/SynapseCard'
import NewTopic from '../components/NewTopic'
import NewSynapse from '../components/NewSynapse'

export default class MapView extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    mobile: PropTypes.bool,
    map: PropTypes.object,
    topic: PropTypes.object,
    mapIsStarred: PropTypes.bool,
    onMapStar: PropTypes.func,
    onMapUnstar: PropTypes.func,
    filterData: PropTypes.object,
    allForFiltering: PropTypes.object,
    visibleForFiltering: PropTypes.object,
    toggleMetacode: PropTypes.func,
    toggleMapper: PropTypes.func,
    toggleSynapse: PropTypes.func,
    filterAllMetacodes: PropTypes.func,
    filterAllMappers: PropTypes.func,
    filterAllSynapses: PropTypes.func,
    toggleInfoBox: PropTypes.func,
    currentUser: PropTypes.object,
    endActiveMap: PropTypes.func,
    launchNewMap: PropTypes.func,
    openImportLightbox: PropTypes.func,
    forkMap: PropTypes.func,
    openHelpLightbox: PropTypes.func,
    onZoomExtents: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    hasLearnedTopicCreation: PropTypes.bool,
    isNewMap: PropTypes.bool,
    selectMapPermission: PropTypes.func,
    deleteActiveMap: PropTypes.func,
    updateThumbnail: PropTypes.func,
    onInfoBoxMount: PropTypes.func,
    removeCollaborator: PropTypes.func,
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
    unreadMessages: PropTypes.number,
    conversationLive: PropTypes.bool,
    isParticipating: PropTypes.bool,
    participants: PropTypes.array,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    leaveCall: PropTypes.func,
    joinCall: PropTypes.func,
    inviteACall: PropTypes.func,
    inviteToJoin: PropTypes.func,
    videoToggleClick: PropTypes.func,
    cursorToggleClick: PropTypes.func,
    soundToggleClick: PropTypes.func,
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

  constructor(props) {
    super(props)
    this.state = {
      chatOpen: false
    }
  }

  componentDidMount() {
    const { match:{params:{ id }}, launchNewMap } = this.props
    launchNewMap(parseInt(id, 10))
  }

  componentWillUnmount() {
    this.endMap()
  }

  endMap() {
    this.setState({
      chatOpen: false
    })
    this.mapChat.reset()
    this.upperOptions.reset()
    this.props.endActiveMap()
  }

  componentDidUpdate(prevProps) {
    const oldMapId = prevProps.match.params.id
    const { match:{params:{ id }}, launchNewMap } = this.props
    if (!oldMapId && id) launchNewMap(parseInt(id, 10))
    else if (oldMapId && id && oldMapId !== id) {
      this.endMap()
      launchNewMap(parseInt(id, 10))
    }
    else if (oldMapId && !id) this.endTopic()
  }

  render = () => {
    const { mobile, map, topic, currentUser, onOpen, onClose,
            toggleInfoBox, allForFiltering, visibleForFiltering,
            toggleMetacode, toggleMapper, toggleSynapse, filterAllMetacodes,
            filterAllMappers, filterAllSynapses, filterData,
            openImportLightbox, forkMap, openHelpLightbox,
            mapIsStarred, onMapStar, onMapUnstar, openTopic,
            onZoomExtents, onZoomIn, onZoomOut, hasLearnedTopicCreation,
            initNewTopic, initNewSynapse, openMetacodeSwitcher,
            isNewMap, selectMapPermission, deleteActiveMap, updateThumbnail,
            relevantPeopleForMap, onInfoBoxMount, removeCollaborator,
            openSynapse, synapseCardPosition, synapseCardSynapses, onSynapseCardMount,
            onSynapseDirectionChange, onSynapsePermissionSelect,
            onSynapseSelect, onTopicFollow, updateTopic,
            metacodeSets, redrawCanvas, participants,
            isParticipating, conversationLive,
            unreadMessages, leaveCall, joinCall,
            inviteACall, inviteToJoin, videoToggleClick,
            cursorToggleClick, soundToggleClick, contextMenu, contextNode,
            contextEdge, contextPos, contextFetchingSiblingsData,
            contextSiblingsData, contextDelete, contextRemove, contextHide, contextCenterOn,
            contextPopoutTopic, contextUpdatePermissions, contextOnMetacodeSelect,
            contextFetchSiblings, contextPopulateSiblings } = this.props
    const { chatOpen } = this.state
    const onChatOpen = () => {
      this.setState({chatOpen: true})
      onOpen()
    }
    const onChatClose = () => {
      this.setState({chatOpen: false})
      onClose()
    }
    const canEditMap = map && map.authorizeToEdit(currentUser)
    return <div className="mapWrapper">
      <UpperOptions ref={x => this.upperOptions = x}
                    map={map}
                    currentUser={currentUser}
                    onImportClick={openImportLightbox}
                    onForkClick={forkMap}
                    canEditMap={canEditMap}
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
      <NewTopic initNewTopic={initNewTopic} openMetacodeSwitcher={openMetacodeSwitcher} />
      <NewSynapse initNewSynapse={initNewSynapse} />
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
      {currentUser && <Instructions mobile={mobile} hasLearnedTopicCreation={hasLearnedTopicCreation} />}
      {currentUser && <MapChat onOpen={onChatOpen}
                               onClose={onChatClose}
                               leaveCall={leaveCall}
                               joinCall={joinCall}
                               inviteACall={inviteACall}
                               inviteToJoin={inviteToJoin}
                               videoToggleClick={videoToggleClick}
                               cursorToggleClick={cursorToggleClick}
                               soundToggleClick={soundToggleClick}
                               unreadMessages={unreadMessages}
                               chatOpen={chatOpen}
                               conversationLive={conversationLive}
                               isParticipating={isParticipating}
                               participants={participants}
                               ref={x => this.mapChat = x} />}
      <VisualizationControls map={map}
                             onClickZoomExtents={onZoomExtents}
                             onClickZoomIn={onZoomIn}
                             onClickZoomOut={onZoomOut} />
      <InfoAndHelp mapIsStarred={mapIsStarred}
                   currentUser={currentUser}
                   map={map}
                   isNewMap={isNewMap}
                   selectMapPermission={selectMapPermission}
                   deleteActiveMap={deleteActiveMap}
                   updateThumbnail={updateThumbnail}
                   toggleInfoBox={toggleInfoBox}
                   onInfoBoxMount={onInfoBoxMount}
                   relevantPeopleForMap={relevantPeopleForMap}
                   removeCollaborator={removeCollaborator}
                   onMapStar={onMapStar}
                   onMapUnstar={onMapUnstar}
                   onHelpClick={openHelpLightbox} />
    </div>
  }
}
