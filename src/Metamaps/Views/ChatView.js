/* global $ */

import Backbone from 'backbone'
import { Howl } from 'howler'

import Active from '../Active'
import DataModel from '../DataModel'
import ReactApp from '../GlobalUI/ReactApp'

import {
  decrementUnreadMessages,
  incrementUnreadMessages,
  updateUnreadMessages,
  updateParticipants,
  updateMessages,
  updateConversationLive,
  updateIsParticipating
} from '../../actions'

const ChatView = {
  isOpen: false,
  alertSound: true, // whether to play sounds on arrival of new messages or not
  cursorsShowing: true,
  videosShowing: true,
  init: function(serverData, store, urls) {
    ChatView.store = store
    ChatView.sound = new Howl({
      src: urls,
      sprite: {
        joinmap: [0, 561],
        leavemap: [1000, 592],
        receivechat: [2000, 318],
        sendchat: [3000, 296],
        sessioninvite: [4000, 5393, true]
      }
    })
    ChatView.store.dispatch(updateParticipants(new Backbone.Collection()))
    ChatView.store.dispatch(updateMessages(new Backbone.Collection()))
  },
  setNewMap: function() {
    ChatView.store.dispatch(updateUnreadMessages(0))
    ChatView.store.dispatch(updateConversationLive(false))
    ChatView.store.dispatch(updateIsParticipating(false))
    ChatView.store.dispatch(updateParticipants(new Backbone.Collection()))
    ChatView.store.dispatch(updateMessages(new Backbone.Collection()))
    ChatView.isOpen = false
    ChatView.alertSound = true // whether to play sounds on arrival of new messages or not
    ChatView.cursorsShowing = true
    ChatView.videosShowing = true
  },
  onOpen: () => {
    ChatView.isOpen = true
    ChatView.store.dispatch(updateUnreadMessages(0))
    $(document).trigger(ChatView.events.openTray)
  },
  onClose: () => {
    ChatView.isOpen = false
    $(document).trigger(ChatView.events.closeTray)
  },
  addParticipant: participant => {
    // TODO: check if this updates the view
    ChatView.store.getState().participants.add(participant)
  },
  removeParticipant: participant => {
    // TODO: check if this updates the view
    ChatView.store.getState().participants.remove(participant)
  },
  leaveConversation: () => {
    ChatView.store.dispatch(updateIsParticipating(false))
  },
  mapperJoinedCall: id => {
    // TODO: check if this updates the view
    const mapper = ChatView.store.getState().participants.findWhere({id})
    mapper && mapper.set('isParticipating', true)
  },
  mapperLeftCall: id => {
    // TODO: check if this updates the view
    const mapper = ChatView.store.getState().participants.findWhere({id})
    mapper && mapper.set('isParticipating', false)
  },
  invitationPending: id => {
    // TODO: check if this updates the view
    const mapper = ChatView.store.getState().participants.findWhere({id})
    mapper && mapper.set('isPending', true)
  },
  invitationAnswered: id => {
    // TODO: check if this updates the view
    const mapper = ChatView.store.getState().participants.findWhere({id})
    mapper && mapper.set('isPending', false)
  },
  conversationInProgress: participating => {
    ChatView.store.dispatch(updateConversationLive(true))
    ChatView.store.dispatch(updateIsParticipating(participating))
  },
  conversationEnded: () => {
    ChatView.store.dispatch(updateConversationLive(false))
    ChatView.store.dispatch(updateIsParticipating(false))
    // TODO: check if this updates the view
    ChatView.store.getState().participants.forEach(p => p.set({isParticipating: false, isPending: false}))
  },
  videoToggleClick: function() {
    ChatView.videosShowing = !ChatView.videosShowing
    $(document).trigger(ChatView.videosShowing ? ChatView.events.videosOn : ChatView.events.videosOff)
  },
  cursorToggleClick: function() {
    ChatView.cursorsShowing = !ChatView.cursorsShowing
    $(document).trigger(ChatView.cursorsShowing ? ChatView.events.cursorsOn : ChatView.events.cursorsOff)
  },
  soundToggleClick: function() {
    ChatView.alertSound = !ChatView.alertSound
  },
  inputFocus: () => {
    $(document).trigger(ChatView.events.inputFocus)
  },
  inputBlur: () => {
    $(document).trigger(ChatView.events.inputBlur)
  },
  addMessage: (message, isInitial, wasMe) => {
    if (!isInitial && !ChatView.isOpen) {
      ChatView.store.dispatch(incrementUnreadMessages())
    }
    if (!wasMe && !isInitial && ChatView.alertSound) {
      ChatView.sound.play('receivechat')
    }
    ChatView.store.getState().messages.add(message)
  },
  sendChatMessage: message => {
    if (ChatView.alertSound) ChatView.sound.play('sendchat')
    var m = new DataModel.Message({
      message: message.message,
      resource_id: Active.Map.id,
      resource_type: 'Map'
    })
    m.save(null, {
      success: function(model, response) {
        ChatView.addMessages(new DataModel.MessageCollection(model), false, true)
      },
      error: function(model, response) {
        console.log('error!', response)
      }
    })
  },
  handleInputMessage: text => {
    ChatView.sendChatMessage({message: text})
  },
  // they should be instantiated as backbone models before they get
  // passed to this function
  addMessages: (messages, isInitial, wasMe) => {
    messages.models.forEach(m => ChatView.addMessage(m, isInitial, wasMe))
  }
}

/**
 * @class
 * @static
 */
ChatView.events = {
  openTray: 'ChatView:openTray',
  closeTray: 'ChatView:closeTray',
  inputFocus: 'ChatView:inputFocus',
  inputBlur: 'ChatView:inputBlur',
  cursorsOff: 'ChatView:cursorsOff',
  cursorsOn: 'ChatView:cursorsOn',
  videosOff: 'ChatView:videosOff',
  videosOn: 'ChatView:videosOn'
}

export default ChatView
