import React, { Component } from 'react'

import AdminHeader from './AdminHeader'
import MetacodeSetEditor from './MetacodeSetEditor'
/*
TODO: 
  get the data actually updating after the network response
*/

class NewMetacodeSet extends Component {
  onSubmit = async (metacodes, name, desc) => {
    const { createMetacodeSet, history } = this.props
    createMetacodeSet(metacodes, name, desc)
      .then(res => {
        console.log(res)
        history.push(`/metacode_sets`)
      })
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