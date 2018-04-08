import React, { Component } from 'react'

class MapDesc extends Component {
  render = () => {
    const { canEdit, desc, id } = this.props
    return (
      <div className="mapInfoDesc" id="mapInfoDesc">
        {canEdit ? <span className="best_in_place best_in_place_desc"
          id={`best_in_place_map_${id}_desc`}
          data-bip-url={`/maps/${id}`}
          data-bip-object="map"
          data-bip-attribute="desc"
          data-bip-nil="Click to add description..."
          data-bip-type="textarea"
          data-bip-activator="#mapInfoDesc"
          data-bip-value={desc}
        >{desc}</span> : desc}
      </div>
    )
  }
}

export default MapDesc
