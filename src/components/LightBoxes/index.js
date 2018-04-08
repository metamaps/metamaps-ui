import React, { Component } from 'react'

import About from './About'
import CheatSheet from './CheatSheet'
import ForkMap from './ForkMap'
import ImportDialogBox from './ImportDialogBox'
import Invite from './Invite'
import NoIE from './NoIE'
import SwitchMetacodes from './SwitchMetacodes'
import Tutorial from './Tutorial'

class LightBoxes extends Component {
  render = () => {
    const {
      metacodeSets,
      selectedMetacodes,
      metacodes,
      onSetSelect,
      importHandleFile,
      downloadScreenshot,
      onExport,
      inviteCode,
      currentUser,
      onMetacodeSetSelectMount
    } = this.props
    const importProps = {
      onFileAdded: importHandleFile,
      downloadScreenshot,
      onExport
    }
    const switchMetacodesProps = {
      metacodeSets,
      selectedMetacodes,
      metacodes,
      onSetSelect,
      onMetacodeSetSelectMount
    }
    return (
      <div id="lightbox_overlay">
        <div id="lightbox_main">
          <a id="lightbox_close" href="#"></a>
          <div id="lightbox_content">
            <About />
            <CheatSheet />
            <NoIE />
            <Tutorial />
            {currentUser && <ForkMap />}
            {currentUser && <ImportDialogBox {...importProps} />}
            {currentUser && <Invite inviteCode={inviteCode} />}
            {currentUser && <SwitchMetacodes {...switchMetacodesProps} />}
          </div>
        </div>
        <div id="lightbox_screen" style={{height: '100%'}}></div>
      </div>
    )
  }
}

export default LightBoxes
