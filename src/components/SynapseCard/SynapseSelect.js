import React, { Component } from 'react'

class SynapseSelect extends Component {
  render = () => {
    const { synapse, synapses, onSynapseSelect } = this.props
    return (
      <ul id="switchSynapseList">
        {synapses.map((s, index) => {
          let desc = s.get('desc')
          desc = desc === '' || desc === null ? '(no description)' : desc
          return s === synapse ? null : (
            <li key={index} data-synapse-index={index} onClick={() => onSynapseSelect(index)}>
              {desc}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default SynapseSelect