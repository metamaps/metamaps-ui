/* global $ */

import Create from '../Create'
import CreateMap from '../Views/CreateMap'
import ReactApp from './ReactApp'

import {
  updateToast
} from '../../actions'

const GlobalUI = {
  notifyTimeout: null,
  notifyQueue: [],
  notifying: false,
  lightbox: null,
  init: function(serverData, store) {
    GlobalUI.store = store
    ReactApp.init(serverData, store, GlobalUI.openLightbox)
    if (serverData.toast) GlobalUI.notifyUser(serverData.toast)
    // bind lightbox clicks
    $('.openLightbox').click(function(event) {
      GlobalUI.openLightbox($(this).attr('data-open'))
      event.preventDefault()
      return false
    })
    $('#lightbox_screen, #lightbox_close').click(GlobalUI.closeLightbox)
    // tab the cheatsheet
    $('#cheatSheet').tabs()
    $('#quickReference').tabs().addClass('ui-tabs-vertical ui-helper-clearfix')
    $('#quickReference .ui-tabs-nav li').removeClass('ui-corner-top').addClass('ui-corner-left')
  },
  showDiv: function(selector) {
    $(selector).show()
    $(selector).animate({
      opacity: 1
    }, 200, 'easeOutCubic')
  },
  hideDiv: function(selector) {
    $(selector).animate({
      opacity: 0
    }, 200, 'easeInCubic', function() { $(this).hide() })
  },
  openLightbox: function(which) {
    $('.lightboxContent').hide()
    $('#' + which).show()

    GlobalUI.lightbox = which

    $('#lightbox_overlay').show()

    var heightOfContent = '-' + ($('#lightbox_main').height() / 2) + 'px'
    // animate the content in from the bottom
    $('#lightbox_main').animate({
      'top': '50%',
      'margin-top': heightOfContent
    }, 200, 'easeOutCubic')

    // fade the black overlay in
    $('#lightbox_screen').animate({
      'opacity': '0.42'
    }, 200)

    if (which === 'switchMetacodes') {
      Create.isSwitchingSet = true
    }
  },

  closeLightbox: function(event) {
    if (event) event.preventDefault()

    // animate the lightbox content offscreen
    $('#lightbox_main').animate({
      'top': '100%',
      'margin-top': '0'
    }, 200, 'easeInCubic')

    // fade the black overlay out
    $('#lightbox_screen').animate({
      'opacity': '0.0'
    }, 200, function() {
      $('#lightbox_overlay').hide()
    })

    if (GlobalUI.lightbox === 'forkmap') CreateMap.reset('fork_map')
    if (Create && Create.isSwitchingSet) {
      Create.cancelMetacodeSetSwitch()
    }
    GlobalUI.lightbox = null
  },
  notifyUser: function(message, opts = {}) {
    if (GlobalUI.notifying) {
      GlobalUI.notifyQueue.push({ message, opts })
      return
    } else {
      GlobalUI._notifyUser(message, opts)
    }
  },
  // note: use the wrapper function notifyUser instead of this one
  _notifyUser: function(message, opts = {}) {
    const { leaveOpen = false, timeOut = 5000 } = opts
    GlobalUI.store.dispatch(updateToast(message))
    clearTimeout(GlobalUI.notifyTimeOut)

    if (!leaveOpen) {
      GlobalUI.notifyTimeOut = setTimeout(function() {
        GlobalUI.clearNotify()
      }, timeOut)
    }

    GlobalUI.notifying = true
  },
  clearNotify: function() {
    // if there are messages remaining, display them
    if (GlobalUI.notifyQueue.length > 0) {
      const { message, opts } = GlobalUI.notifyQueue.shift()
      GlobalUI._notifyUser(message, opts)
    } else {
      GlobalUI.store.dispatch(updateToast(''))
      GlobalUI.notifying = false
    }
  }
}

export { ReactApp }
export default GlobalUI
