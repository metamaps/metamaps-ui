import React, { Component } from 'react'

class SynapseDesc extends Component {
  render = () => {
    const { id, desc, canEdit } = this.props
    const dataNil = 'Click to add description.'
    return (
      <div id="edit_synapse_desc" className="best_in_place best_in_place_desc"
           data-bip-object="synapse"
           data-bip-attribute="desc"
           data-bip-type="textarea"
           data-bip-nil={dataNil}
           data-bip-url={`/synapses/${id}`}
           data-bip-value={desc}>
        {desc.trim() !== "" && desc}
        {desc.trim() === "" && canEdit && dataNil}
        {desc.trim() === "" && !canEdit && '(no description)'}
      </div>
    )
  }
}

export default SynapseDesc