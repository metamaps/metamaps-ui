import React, { Component } from 'react'

import AdminHeader from './AdminHeader'
import MetacodeSetEditor from './MetacodeSetEditor'

/*
TODO:
  get the data actually updating after the network response
*/

class EditMetacodeSet extends Component {
  onSubmit = async(metacodes, name, desc) => {
    const { updateMetacodeSet, history, match: {params: { id }} } = this.props
    updateMetacodeSet(id, metacodes, name, desc)
      .then(res => {
        console.log(res)
        history.push(`/metacode_sets`)
      })
  }

  render = () => {
    const { metacodeSets, metacodes } = this.props
    const id = parseInt(this.props.match.params.id, 10)
    const metacodeSet = metacodeSets.find(m => m.id === id)
    return (
      <div>
        <div id="yield">
          <div className="centerContent">
            <MetacodeSetEditor metacodeSet={metacodeSet} metacodes={metacodes} onSubmit={this.onSubmit} forEdit />
          </div>
        </div>
        <AdminHeader />
      </div>
    )
  }
}

export default EditMetacodeSet
