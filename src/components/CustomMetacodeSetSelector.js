import React, { Component } from 'react'
import MetacodeSetSelectorItem from './MetacodeSetSelectorItem'

class CustomMetacodeSetSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMetacodes: []
    }
  }

  componentWillMount() {
    const { metacodes, selectedMetacodes } = this.props
    const isCustom = selectedMetacodes.length && !selectedMetacodes[0].includes('metacodeset')
    if (isCustom) {
      this.setState({
        selectedMetacodes: selectedMetacodes.map(id => parseInt(id, 10))
      })
    }
  }

  selectAll = () => {
    this.setState({
      selectedMetacodes: this.props.allMetacodes.map(m => m.id)
    })
  }

  deselectAll = () => {
    this.setState({ selectedMetacodes: [] })
  }

  liClickHandler = (metacodeId) => {
    const { selectedMetacodes } = this.state
    if (selectedMetacodes.indexOf(metacodeId) > -1) {
      this.setState({
        selectedMetacodes: selectedMetacodes.filter(id => id !== metacodeId)
      })
    } else {
      this.setState({
        selectedMetacodes: selectedMetacodes.concat([metacodeId])
      })
    }
  }

  submit = () => {
    const { onSetSelect, index } = this.props
    const { selectedMetacodes } = this.state
    onSetSelect('custom', index, true, selectedMetacodes)
  }

  render = () => {
    const { onSetSelect, index, allMetacodes } = this.props
    const { selectedMetacodes } = this.state
    const allSelected = allMetacodes.length === selectedMetacodes.length
    const noneSelected = selectedMetacodes.length === 0
    return (
      <div id="metacodeSwitchTabsCustom">
        <div className="setDesc">Choose Your Metacodes</div>
        <div className={noneSelected ? 'selectNone selected' : 'selectNone'} onClick={this.deselectAll}>
          NONE
        </div>
        <div className={allSelected ? 'selectAll selected' : 'selectAll'} onClick={this.selectAll}>
          ALL
        </div>
        <div className="customMetacodeList">
          <ul>
            {allMetacodes.map((m, index) => {
              const inUse = !!selectedMetacodes.find(id => id === m.id)
              return (
                <MetacodeSetSelectorItem
                  metacode={m}
                  selected={inUse}
                  key={index}
                  onClick={() => this.liClickHandler(m.id)} />
              )
            })}
          </ul>
          <div className="clearfloat"></div>
        </div>
        <button className="button" disabled={noneSelected} onClick={this.submit}>
            Switch to Custom Set
        </button>
      </div>
    )
  }
}

export default CustomMetacodeSetSelector
