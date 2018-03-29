import React, { Component } from 'react'

class MapMeta extends Component {
  render = () => {
    const { userName, createdAt, updatedAt } = this.props
    return (
      <div className="mapInfoMeta">
        <p className="mapCreatedAt"><span>Created by:</span> {userName} on {createdAt}</p>
        <p className="mapEditedAt"><span>Last edited:</span> {updatedAt}</p>
        <div className="mapInfoButtonsWrapper">
          <div className="mapInfoThumbnail">
            <div className="thumbnail"></div>
            <div className="tooltip">Update Thumbnail</div>
            <span>Thumb</span>
          </div>
          <div className="mapInfoDelete">
            <div className="deleteMap"></div>
            <span>Delete</span>
          </div>
          <div className="mapInfoShare">
            <div className="mapInfoShareIcon"></div>
            <span>Share</span>
          </div>
        </div>
      </div>
    )
  }
}

export default MapMeta 