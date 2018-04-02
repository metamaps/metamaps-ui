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
import {
  ImportDialog,
  Notifications,
  ExploreMaps,
  ChatView,
  TopicCard,
  SynapseCard,
  ContextMenu
} from '../Views'
import Filter from '../Filter'
import JIT from '../JIT'
import PasteInput from '../PasteInput'
import Realtime from '../Realtime'
import Map, { InfoBox } from '../Map'
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
  handleUpdate: function(location, action) {
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
  render: function() {
    //ReactApp.store.dispatch({type: UPDATE, payload: ReactApp.getDataProps()})
  },
  getCallbackProps: function() {
    const { render } = ReactApp
    const plot = Visualize.mGraph ? Visualize.mGraph.plot.bind(Visualize.mGraph) : () => {}
    return {
      updateUser: DataFetcher.updateUser,
      mobileTitleClick: (e) => Active.Map && InfoBox.toggleBox(e),
      openInviteLightbox: () => ReactApp.openLightbox('invite'),
      fetchNotifications: apply(Notifications.fetchNotifications, render),
      fetchNotification: apply(Notifications.fetchNotification, render),
      markAsRead: apply(Notifications.markAsRead, render),
      markAsUnread: apply(Notifications.markAsUnread, render),
      denyAccessRequest: DataFetcher.denyAccessRequest,
      approveAccessRequest: DataFetcher.approveAccessRequest,
      onSetSelect: Create.updateMetacodeSet,
      onMetacodeSetSelectMount: Create.setupMetacodeSetTabs,
      selectMapPermission: apply(InfoBox.selectPermission, render, Active.Map),
      deleteActiveMap: apply(InfoBox.deleteActiveMap, Active.Map, Active.Mapper),
      updateThumbnail: apply(Map.uploadMapScreenshot, Active.Map),
      onInfoBoxMount: apply(InfoBox.attachEventListeners, render, Active.Map, Active.Mapper),
      removeCollaborator: apply(InfoBox.removeCollaborator, render, Active.Map),
      openImportLightbox: () => ImportDialog.show(),
      openMetacodeSwitcher: () => self.openLightbox('switchMetacodes'),
      forkMap: Map.fork,
      onMapStar: Map.star,
      onMapUnstar: Map.unstar,
      initNewTopic: Create.newTopic.init,
      initNewSynapse: Create.newSynapse.init,
      importHandleFile: PasteInput.handleFile,
      downloadScreenshot: ImportDialog.downloadScreenshot,
      onExport: format => () => {
        window.open(`${window.location.pathname}/export.${format}`, '_blank')
      },
      requestAccess: DataFetcher.requestAccess,
      endActiveMap: Map.end,
      launchNewMap: Map.launch,
      toggleInfoBox: InfoBox.toggleBox,
      onRequestAccess: Map.requestAccess,
      openHelpLightbox: () => self.openLightbox('cheatsheet'),
      onZoomExtents: (event) => JIT.zoomExtents(event, Visualize.mGraph.canvas),
      onZoomIn: JIT.zoomIn,
      onZoomOut: JIT.zoomOut,
      updateTopic: (topic, obj) => {
        topic.save(obj)
        render()
      },
      onTopicFollow: Topic.onTopicFollow,
      onSynapseCardMount: apply(SynapseCard.onSynapseCardMount, plot, SynapseCard.openSynapse),
      onSynapseDirectionChange: apply(SynapseCard.onDirectionChange, plot, SynapseCard.openSynapse),
      onSynapsePermissionSelect: apply(SynapseCard.onPermissionSelect, SynapseCard.openSynapse),
      onSynapseSelect: apply(SynapseCard.onSynapseSelect, plot, SynapseCard.openSynapse),
      contextDelete: apply(ContextMenu.delete, render),
      contextRemove: apply(ContextMenu.remove, render),
      contextHide: apply(ContextMenu.hide, render),
      contextCenterOn: apply(ContextMenu.centerOn, render),
      contextPopoutTopic: apply(ContextMenu.popoutTopic, render),
      contextUpdatePermissions: apply(ContextMenu.updatePermissions, render),
      contextOnMetacodeSelect: apply(ContextMenu.onMetacodeSelect, render),
      contextFetchSiblings: apply(ContextMenu.fetchSiblings, render),
      contextPopulateSiblings: apply(ContextMenu.populateSiblings, render),
      endActiveTopic: Topic.end,
      launchNewTopic: Topic.launch,
      loadMore: ExploreMaps.loadMore,
      onStar: ExploreMaps.onStar,
      onRequest: ExploreMaps.onRequest,
      onMapFollow: ExploreMaps.onMapFollow,
      onOpen: ChatView.onOpen,
      onClose: ChatView.onClose,
      leaveCall: Realtime.leaveCall,
      joinCall: Realtime.joinCall,
      inviteACall: Realtime.inviteACall,
      inviteToJoin: Realtime.inviteToJoin,
      videoToggleClick: ChatView.videoToggleClick,
      cursorToggleClick: ChatView.cursorToggleClick,
      soundToggleClick: ChatView.soundToggleClick,
      inputBlur: ChatView.inputBlur,
      inputFocus: ChatView.inputFocus,
      handleInputMessage: ChatView.handleInputMessage,
      toggleMetacode: Filter.toggleMetacode,
      toggleMapper: Filter.toggleMapper,
      toggleSynapse: Filter.toggleSynapse,
      filterAllMetacodes: Filter.filterAllMetacodes,
      filterAllMappers: Filter.filterAllMappers,
      filterAllSynapses: Filter.filterAllSynapses,
      createMetacodeSet: DataFetcher.createMetacodeSet,
      updateMetacodeSet: DataFetcher.updateMetacodeSet,
      deleteMetacodeSet: DataFetcher.deleteMetacodeSet,
      createMetacode: DataFetcher.createMetacode,
      updateMetacode: DataFetcher.updateMetacode
    }
  },
  resize: function() {
    const self = ReactApp
    const maps = ExploreMaps.collection
    const currentUser = Active.Mapper
    const user = maps && maps.id === 'mapper' ? ExploreMaps.mapper : null
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
