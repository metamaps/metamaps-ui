import React, { Component } from 'react'
import MetacodeSetSelectorItem from './MetacodeSetSelectorItem'

class MetacodeSetDisplay extends Component {
  render = () => {
    const { onSetSelect, metacodeIds, allMetacodes, id, index, name, desc } = this.props

    return (
      <div id={`metacodeSwitchTabs${id}`} data-metacodes={ metacodeIds.join(',') }>
        <div className="metacodeSwitchTab">
          <p className="setDesc">{ desc }</p>
          <div className="metacodeSetList">
            <ul>
              {metacodeIds.map((id, index) => {
                const metacode = allMetacodes.find(m => m.id === id)
                return <MetacodeSetSelectorItem metacode={metacode} selected key={index} />
              })}
            </ul>
            <div className="clearfloat"></div>
          </div>
        </div>
        <button className="button" onClick={() => onSetSelect(id, index, false, metacodeIds)}>
          Switch To Set
        </button>
      </div>
    )
  }
}

export default MetacodeSetDisplay
