import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MobileHeader from '../containers/componentContainers/MobileHeader'
import UpperLeftUI from '../containers/componentContainers/UpperLeftUI'
import UpperRightUI from '../containers/componentContainers/UpperRightUI'
import Toast from '../containers/componentContainers/Toast'
import LightBoxes from '../containers/componentContainers/LightBoxes'

class App extends Component {
  static propTypes = {
    mobile: PropTypes.bool,
    currentUser: PropTypes.object
  }

  static childContextTypes = {
    location: PropTypes.object
  }

  getChildContext() {
    const { location } = this.props
    return {location}
  }

  render() {
    const { currentUser, children, mobile, location } = this.props
    // this fixes a bug that happens otherwise when you logout
    const unauthedHome = location.pathname === '/' && !currentUser
    return <div className="wrapper" id="wrapper">
      {mobile && <MobileHeader />}
      {!unauthedHome && <UpperLeftUI />}
      {!mobile && <UpperRightUI />}
      <Toast />
      {children}
      <LightBoxes />
    </div>
  }
}

export default App
