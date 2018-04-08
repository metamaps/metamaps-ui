import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MobileHeader from '../containers/componentContainers/MobileHeader'
import UpperLeftUI from '../containers/componentContainers/UpperLeftUI'
import UpperRightUI from '../containers/componentContainers/UpperRightUI'
import Toast from '../containers/componentContainers/Toast'
import LightBoxes from '../containers/componentContainers/LightBoxes'
import {
  MOBILE_VIEW_BREAKPOINT
} from '../constants'

class App extends Component {
  static propTypes = {
    mobile: PropTypes.bool,
    currentUser: PropTypes.object
  }

  static childContextTypes = {
    location: PropTypes.object
  }

  componentWillMount() {
    window && window.addEventListener('resize', this.resize)
    this.resize()
  }

  resize = () => {
    const { setMobile, setMobileTitleWidth } = this.props
    const mobileTitleWidth = document ? document.body.clientWidth - 70 : 0
    const mobile = document && document.body.clientWidth <= MOBILE_VIEW_BREAKPOINT
    setMobileTitleWidth(mobileTitleWidth)
    setMobile(mobile)
  }

  getChildContext() {
    const { location } = this.props
    return {location}
  }

  render() {
    const { currentUser, children, mobile, location, history, match } = this.props
    const unauthedHome = location.pathname === '/' && !currentUser
    return <div className="wrapper" id="wrapper">
      {mobile && <MobileHeader location={location} history={history} match={match} />}
      {!unauthedHome && <UpperLeftUI location={location} history={history} match={match} />}
      {!mobile && <UpperRightUI location={location} history={history} match={match} />}
      <Toast location={location} history={history} match={match} />
      {children}
      <LightBoxes location={location} history={history} match={match} />
    </div>
  }
}

export default App
