import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class VisualizationControls extends Component {
  static propTypes = {
    isMap: PropTypes.bool,
    onClickZoomExtents: PropTypes.func,
    onClickZoomIn: PropTypes.func,
    onClickZoomOut: PropTypes.func
  }

  render() {
    const { isMap, onClickZoomExtents, onClickZoomIn, onClickZoomOut } = this.props
    return <div className="mapControls mapElement">
      {isMap && <div className="zoomExtents mapControl" onClick={onClickZoomExtents}>
        <div className="tooltips">Center View</div>
      </div>}
      <div className="zoomIn mapControl" onClick={onClickZoomIn}>
        <div className="tooltips">Zoom In</div>
      </div>
      <div className="zoomOut mapControl" onClick={onClickZoomOut}>
        <div className="tooltips">Zoom Out</div>
      </div>
    </div>
  }
}
