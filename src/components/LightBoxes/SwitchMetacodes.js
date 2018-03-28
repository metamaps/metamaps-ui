import React, { Component } from 'react'
import MetacodeSetSelectorItem from '../MetacodeSetSelectorItem'
import CustomMetacodeSetSelector from '../CustomMetacodeSetSelector'
import MetacodeSetDisplay from '../MetacodeSetDisplay'
/*

<script>
  Metamaps.Create.selectedMetacodeSet = "metacodeset-{ selectedSet }"
  Metamaps.Create.selectedMetacodeSetIndex = { index }
</script>

*/

class SwitchMetacodes extends Component {
  componentDidMount = () => {
    this.props.onMetacodeSetSelectMount()
  }
  render = () => {
    const {
      metacodeSets,
      selectedMetacodes,
      metacodes,
      onSetSelect
    } = this.props
    return (
      <div className="lightboxContent" id="switchMetacodes">
        <h3>Switch Metacode Set</h3>
        <p>Use metacode sets to enter different modes of mapping.</p>
        <div id="metacodeSwitchTabs">
          <SetsMenu sets={metacodeSets} />
          {metacodeSets.map((set, index) => {
            return (
              <MetacodeSetDisplay
                onSetSelect={onSetSelect}
                metacodeIds={set.metacodes}
                allMetacodes={metacodes}
                id={set.id}
                name={set.name}
                desc={set.desc}
                index={index}
                key={index} />
            )
          })}
          <CustomMetacodeSetSelector
            onSetSelect={onSetSelect}
            index={metacodeSets.length}
            selectedMetacodes={selectedMetacodes}
            allMetacodes={metacodes} />
        </div>
        <div className="clearfloat"></div>
      </div>
    )
  }
}

class SetsMenu extends Component {
  render = () => {
    return (
      <ul>
        {this.props.sets.map((set, index) => {
          return (
            <li key={index}>
              <a href={`#metacodeSwitchTabs${ set.id }`}>
                { set.name }
              </a>
            </li>
          )
        })}
        <li>
          <a href="#metacodeSwitchTabsCustom">
            CUSTOM SELECTION
          </a>
        </li>
      </ul>
    )
  }
}

export { SetsMenu }

export default SwitchMetacodes