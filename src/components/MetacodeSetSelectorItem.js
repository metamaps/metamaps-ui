import React, { Component } from 'react'

export default class MetacodeSetSelectorItem extends Component {
  render = () => {
    const { selected, onClick, metacode } = this.props
    return (
      <li id={metacode.id} className={selected ? "" : "toggledOff"} onClick={onClick}>
        <img src={metacode.icon} alt={metacode.name} />
        <p>{metacode.name.toLowerCase()}</p>
        <div className="clearfloat"></div>
      </li>
    )
  }
}