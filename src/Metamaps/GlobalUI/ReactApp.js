/* global $ */

import React from 'react'
import ReactDOM from 'react-dom'
import apply from 'async/apply'
import createHistory from "history/createBrowserHistory"

import { notifyUser } from './index.js'
import Active from '../Active'
import Create from '../Create'
import DataModel from '../DataModel'
import DataFetcher from '../DataFetcher'
import ImportDialog from '../Views/ImportDialog'
import Notifications from '../Views/Notifications'
import ExploreMaps from '../Views/ExploreMaps'
import ChatView from '../Views/ChatView'
import TopicCard from '../Views/TopicCard'
import SynapseCard from '../Views/SynapseCard'
import ContextMenu from '../Views/ContextMenu'
import InfoBox from '../Views/InfoBox'
import Filter from '../Filter'
import JIT from '../JIT'
import PasteInput from '../PasteInput'
import Realtime from '../Realtime'
import Map from '../Map'
import Topic from '../Topic'
import Visualize from '../Visualize'
import makeApp from '../../makeApp'
import {
  updateMap,
  updateMapsWidth,
  updateMobile,
  updateMobileTitleWidth,
  updateTopic
} from '../../actions'

// 220 wide + 16 padding on both sides
const MAP_WIDTH = 252
const MOBILE_VIEW_BREAKPOINT = 504
const MOBILE_VIEW_PADDING = 40
const MAX_COLUMNS = 4

const ReactApp = {
  init: function(serverData, store, openLightbox) {
    ReactApp.store = store
    ReactApp.openLightbox = openLightbox
    ReactApp.history = createHistory()
    ReactApp.history.listen(ReactApp.handleUpdate)
    const app = makeApp(serverData.ActiveMapper, ReactApp.history, store)
    ReactDOM.render(app, document.getElementById('app'))
    ReactApp.resize()
    window && window.addEventListener('resize', ReactApp.resize)
  },
  handleUpdate: function(location) {
    const pathname = location.pathname
    switch (pathname.split('/')[1]) {
      case '':
        if (Active.Mapper && Active.Mapper.id) {
          ExploreMaps.updateFromPath(pathname)
          ReactApp.store.dispatch(updateMap(null))
          ReactApp.store.dispatch(updateTopic(null))
        }
        break
      case 'explore':
        ExploreMaps.updateFromPath(pathname)
        ReactApp.store.dispatch(updateMap(null))
        ReactApp.store.dispatch(updateTopic(null))
        break
      case 'topics':
        ReactApp.store.dispatch(updateMap(null))
        break
      case 'maps':
        ReactApp.store.dispatch(updateTopic(null))
        break
      default:
        break
    }
    window.ga && window.ga('send', 'pageview', pathname)
  },
  getCallbackProps: function() {
    return {
      mobileTitleClick: (e) => Active.Map && InfoBox.toggleBox(e),
      openInviteLightbox: () => ReactApp.openLightbox('invite'),
      openHelpLightbox: () => ReactApp.openLightbox('cheatsheet'),

      // notifications
      fetchNotifications: Notifications.fetchNotifications,
      fetchNotification: Notifications.fetchNotification,
      markAsRead: Notifications.markAsRead,
      markAsUnread: Notifications.markAsUnread,

      // content creation
      onSetSelect: Create.updateMetacodeSet,
      onMetacodeSetSelectMount: Create.setupMetacodeSetTabs,
      openMetacodeSwitcher: () => ReactApp.openLightbox('switchMetacodes'),
      initNewTopic: Create.newTopic.init,
      initNewSynapse: Create.newSynapse.init,

      // access requests for maps
      // TODO: dedupe with Map.requestAccess and ExploreMaps.onRequest
      requestAccess: DataFetcher.requestAccess,
      denyAccessRequest: DataFetcher.denyAccessRequest,
      approveAccessRequest: DataFetcher.approveAccessRequest,

      // individual map
      launchNewMap: Map.launch,
      endActiveMap: Map.end,
      selectMapPermission: InfoBox.selectPermission,
      deleteActiveMap: InfoBox.deleteActiveMap,
      updateThumbnail: Map.uploadMapScreenshot,
      toggleInfoBox: InfoBox.toggleBox,
      onInfoBoxMount: InfoBox.attachEventListeners,
      removeCollaborator: InfoBox.removeCollaborator,
      openImportLightbox: () => ImportDialog.show(),
      forkMap: Map.fork,
      onMapStar: Map.star,
      onMapUnstar: Map.unstar,
      // TODO: dedupe with DataFetcher.requestAccess and ExploreMaps.onRequest
      onRequestAccess: Map.requestAccess,
      importHandleFile: PasteInput.handleFile,
      downloadScreenshot: ImportDialog.downloadScreenshot,
      onExport: format => () => {
        window.open(`${window.location.pathname}/export.${format}`, '_blank')
      },
      onZoomExtents: (event) => JIT.zoomExtents(event, Visualize.mGraph.canvas),
      onZoomIn: JIT.zoomIn,
      onZoomOut: JIT.zoomOut,

      // on map realtime conversations
      leaveCall: Realtime.leaveCall,
      joinCall: Realtime.joinCall,
      inviteACall: Realtime.inviteACall,
      inviteToJoin: Realtime.inviteToJoin,

      // on map chat panel
      onOpen: ChatView.onOpen,
      onClose: ChatView.onClose,
      videoToggleClick: ChatView.videoToggleClick,
      cursorToggleClick: ChatView.cursorToggleClick,
      soundToggleClick: ChatView.soundToggleClick,
      inputBlur: ChatView.inputBlur,
      inputFocus: ChatView.inputFocus,
      handleInputMessage: ChatView.handleInputMessage,

      // on map (or topic view) filters
      toggleMetacode: Filter.toggleMetacode,
      toggleMapper: Filter.toggleMapper,
      toggleSynapse: Filter.toggleSynapse,
      filterAllMetacodes: Filter.filterAllMetacodes,
      filterAllMappers: Filter.filterAllMappers,
      filterAllSynapses: Filter.filterAllSynapses,

      // individual topic
      updateTopic: (topic, obj) => topic.save(obj),
      onTopicFollow: Topic.onTopicFollow,

      // individual synapse
      onSynapseCardMount: SynapseCard.onSynapseCardMount,
      onSynapseDirectionChange: SynapseCard.onDirectionChange,
      onSynapseSelect: SynapseCard.onSynapseSelect,
      onSynapsePermissionSelect: SynapseCard.onPermissionSelect,

      // right-click / context menu
      contextDelete: ContextMenu.delete,
      contextRemove: ContextMenu.remove,
      contextHide: ContextMenu.hide,
      contextCenterOn: ContextMenu.centerOn,
      contextPopoutTopic: ContextMenu.popoutTopic,
      contextUpdatePermissions: ContextMenu.updatePermissions,
      contextOnMetacodeSelect: ContextMenu.onMetacodeSelect,
      contextFetchSiblings: ContextMenu.fetchSiblings,
      contextPopulateSiblings: ContextMenu.populateSiblings,

      // topic view
      endActiveTopic: Topic.end,
      launchNewTopic: Topic.launch,

      // explore maps
      loadMore: ExploreMaps.loadMore,
      onStar: ExploreMaps.onStar,
      onRequest: ExploreMaps.onRequest,
      onMapFollow: ExploreMaps.onMapFollow,

      // user settings
      updateUser: DataFetcher.updateUser,

      // metacode sets
      createMetacodeSet: DataFetcher.createMetacodeSet,
      updateMetacodeSet: DataFetcher.updateMetacodeSet,
      deleteMetacodeSet: DataFetcher.deleteMetacodeSet,

      // metacodes
      createMetacode: DataFetcher.createMetacode,
      updateMetacode: DataFetcher.updateMetacode
    }
  },
  resize: function() {
    const { maps, user, currentUser } = ReactApp.store.getState()
    const numCards = (maps ? maps.length : 0) + (user || currentUser ? 1 : 0)
    const mapSpaces = Math.floor(document.body.clientWidth / MAP_WIDTH)
    const mapsWidth = document.body.clientWidth <= MOBILE_VIEW_BREAKPOINT
                        ? document.body.clientWidth - MOBILE_VIEW_PADDING
                        : Math.min(MAX_COLUMNS, Math.min(numCards, mapSpaces)) * MAP_WIDTH

    const mobileTitleWidth = document ? document.body.clientWidth - 70 : 0
    const mobile = document && document.body.clientWidth <= MOBILE_VIEW_BREAKPOINT
    ReactApp.store.dispatch(updateMobileTitleWidth(mobileTitleWidth))
    ReactApp.store.dispatch(updateMapsWidth(mapsWidth))
    ReactApp.store.dispatch(updateMobile(mobile))
  }
}

export default ReactApp
