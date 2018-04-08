import React, { Component } from 'react'

class MapName extends Component {
  render = () => {
    const { canEdit, id, name } = this.props
    return (<div>
      <div className="requestTitle">Click here to name this map</div>
      <div className="mapInfoName" id="mapInfoName">
        {canEdit ? <span className="best_in_place best_in_place_name"
          id={`best_in_place_map_${id}_name`}
          data-bip-url={`/maps/${id}`}
          data-bip-object="map"
          data-bip-attribute="name"
          data-bip-type="textarea"
          data-bip-activator="#mapInfoName"
          data-bip-value={name}
        >{name}</span> : name}
      </div>
    </div>
    )
  }
}

export default MapName
