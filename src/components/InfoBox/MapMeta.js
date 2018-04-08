import React, { Component } from 'react'

class MapMeta extends Component {
  render = () => {
    const { userName, createdAt, updatedAt, deleteActiveMap, updateThumbnail } = this.props
    return (
      <div className="mapInfoMeta">
        <p className="mapCreatedAt"><span>Created by:</span> {userName} on {createdAt}</p>
        <p className="mapEditedAt"><span>Last edited:</span> {updatedAt}</p>
        <div className="mapInfoButtonsWrapper">
          <div className="mapInfoThumbnail" onClick={updateThumbnail}>
            <div className="thumbnail"></div>
            <div className="tooltip">Update Thumbnail</div>
            <span>Thumb</span>
          </div>
          <div className="mapInfoDelete" onClick={deleteActiveMap}>
            <div className="deleteMap"></div>
            <span>Delete</span>
          </div>
        </div>
      </div>
    )
  }
}

export default MapMeta
