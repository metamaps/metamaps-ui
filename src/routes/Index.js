import React, { Component } from 'react'

import LoggedOutHome from './LoggedOutHome'
import Maps from '../containers/MapsContainer'

class Index extends Component {
  render = () => {
    return (
      this.props.currentUserId ? <Maps /> : <LoggedOutHome />
    )
  }
}

export default Index
