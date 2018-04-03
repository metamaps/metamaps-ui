import React, { Component } from 'react'

import AdminHeader from './AdminHeader'
import MetacodeSetEditor from './MetacodeSetEditor'
/*
TODO: 
  get the data actually updating after the network response
*/

class NewMetacodeSet extends Component {
  onSubmit = async (metacodes, name, desc) => {
    const { createMetacodeSet } = this.props
    try {
      const result = await createMetacodeSet(metacodes, name, desc)
      this.props.history.push(`/metacode_sets`)
    } catch (e) {
      console.log(e)
      window.alert('There was an error creating the metacode set')
    }
  }

  render = () => {
    const { metacodes } = this.props
    return (
      <div>
        <div id="yield">
          <div className="centerContent">
            <MetacodeSetEditor metacodes = {metacodes} onSubmit={this.onSubmit} forNew />
          </div>
        </div>
        <AdminHeader />
      </div>
    )
  }
}

export default NewMetacodeSet