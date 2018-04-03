/* global $ */

import Map from '../Map'

const ImportDialog = {
  init: function(serverData, store, openLightbox, closeLightbox) {
    ImportDialog.openLightbox = openLightbox
    ImportDialog.closeLightbox = closeLightbox
  },
  show: function() {
    ImportDialog.openLightbox('import-dialog')
  },
  hide: function() {
    ImportDialog.closeLightbox()
  },
  downloadScreenshot: function() {
    ImportDialog.hide()
    Map.offerScreenshotDownload()
  }
}

export default ImportDialog
