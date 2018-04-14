import React, { Component } from 'react'

class LightBox extends Component {
  render = () => {
    const { closeLightbox, children } = this.props
    return (
      <div id="lightbox_overlay">
        <div id="lightbox_main">
          <div id="lightbox_close" onClick={closeLightbox}></div>
          <div id="lightbox_content">
            {children}
          </div>
        </div>
        <div id="lightbox_screen" style={{height: '100%'}}></div>
      </div>
    )
  }
}

export default LightBox
