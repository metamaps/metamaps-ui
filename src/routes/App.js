import React, { Component } from 'react'
import PropTypes from 'prop-types'

import About from '../components/About'
import Invite from '../components/Invite'
import Tutorial from '../components/Tutorial'
import NoIE from '../components/NoIE'

import MobileHeader from '../containers/componentContainers/MobileHeader'
import UpperLeftUI from '../containers/componentContainers/UpperLeftUI'
import UpperRightUI from '../containers/componentContainers/UpperRightUI'
import Toast from '../containers/componentContainers/Toast'
import LightBox from '../containers/componentContainers/LightBox'
import {
  MOBILE_VIEW_BREAKPOINT
} from '../constants'

class App extends Component {
  static propTypes = {
    mobile: PropTypes.bool,
    currentUser: PropTypes.object,
    createStatus: PropTypes.object,
    setMobileTitleWidth: PropTypes.func,
    clearCreateStatus: PropTypes.func
  }

  static childContextTypes = {
    location: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    const { history, createStatus, clearCreateStatus } = nextProps
    if (createStatus.error) {
      // TODO
    } else if (createStatus.response) {
      clearCreateStatus()
      history.push(`/maps/${createStatus.response.data.id}?new`)
    }
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
    const { currentUser, children, mobile, location, history, match,
      aboutOpen, tutorialOpen, inviteOpen, noIeOpen, closeLightbox } = this.props
    const unauthedHome = location.pathname === '/' && !currentUser

    const lightboxOpen = aboutOpen || inviteOpen || tutorialOpen || noIeOpen

    return <div className="wrapper" id="wrapper">
      {mobile && <MobileHeader location={location} history={history} match={match} />}
      {!unauthedHome && <UpperLeftUI location={location} history={history} match={match} />}
      {!mobile && <UpperRightUI location={location} history={history} match={match} />}
      <Toast location={location} history={history} match={match} />
      {children}
      {lightboxOpen && <LightBox closeLightbox={closeLightbox} location={location} history={history} match={match}>
        {aboutOpen && <About />}
        {inviteOpen && <Invite />}
        {tutorialOpen && <Tutorial />}
        {noIeOpen && <NoIE />}
      </LightBox>}
    </div>
  }
}

export default App
