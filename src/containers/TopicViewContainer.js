import { connect } from 'react-redux'

import ReactApp from '../Metamaps/GlobalUI/ReactApp'
import TopicView from '../routes/TopicView'

function mapStateToProps(state) {
  const {
    mobile,
    map,
    topic,
    metacodeSets,
    currentUser,
    allForFiltering,
    visibleForFiltering,
    filterData,
    openTopic,
    openSynapse,
    synapseCardPosition,
    synapseCardSynapses,
    contextNode,
    contextEdge,
    contextFetchingSiblingsData,
    contextSiblingsData,
    contextPos
  } = state

  return {
    mobile,
    map,
    topic,
    metacodeSets,
    currentUser,
    allForFiltering,
    visibleForFiltering,
    filterData,
    openTopic,
    openSynapse,
    synapseCardPosition,
    synapseCardSynapses,
    contextNode,
    contextEdge,
    contextFetchingSiblingsData,
    contextSiblingsData,
    contextPos
  }
}

function mapDispatchToProps(dispatch)  {
  const {
    launchNewTopic,
    endActiveTopic,
    forkMap,
    toggleInfoBox,
    toggleMetacode,
    toggleMapper,
    toggleSynapse,
    filterAllMetacodes,
    filterAllMappers,
    filterAllSynapses,
    openHelpLightbox,
    onZoomExtents,
    onZoomIn,
    onZoomOut,
    onSynapseCardMount,
    onSynapseDirectionChange,
    onSynapsePermissionSelect,
    onSynapseSelect,
    updateTopic,
    onTopicFollow,
    redrawCanvas,
    contextDelete,
    contextRemove,
    contextHide,
    contextCenterOn,
    contextPopoutTopic,
    contextUpdatePermissions,
    contextOnMetacodeSelect,
    contextFetchSiblings,
    contextPopulateSiblings
  } = ReactApp.getCallbackProps()

  return {
    launchNewTopic,
    endActiveTopic,
    forkMap,
    toggleInfoBox,
    toggleMetacode,
    toggleMapper,
    toggleSynapse,
    filterAllMetacodes,
    filterAllMappers,
    filterAllSynapses,
    openHelpLightbox,
    onZoomExtents,
    onZoomIn,
    onZoomOut,
    onSynapseCardMount,
    onSynapseDirectionChange,
    onSynapsePermissionSelect,
    onSynapseSelect,
    updateTopic,
    onTopicFollow,
    redrawCanvas,
    contextDelete,
    contextRemove,
    contextHide,
    contextCenterOn,
    contextPopoutTopic,
    contextUpdatePermissions,
    contextOnMetacodeSelect,
    contextFetchSiblings,
    contextPopulateSiblings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicView)

