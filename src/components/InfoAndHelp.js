import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MapInfoBox from '../routes/MapView/MapInfoBox'

class InfoAndHelp extends Component {
  static propTypes = {
    mapIsStarred: PropTypes.bool,
    currentUser: PropTypes.object,
    map: PropTypes.object,
    onHelpClick: PropTypes.func,
    onMapStar: PropTypes.func,
    onMapUnstar: PropTypes.func,
    toggleInfoBox: PropTypes.func,
    selectMapPermission: PropTypes.func,
    deleteActiveMap: PropTypes.func,
    updateThumbnail: PropTypes.func
  }

  render () {
    const { mapIsStarred, map, currentUser,
            toggleInfoBox, onMapStar, onMapUnstar, onHelpClick,
            isNewMap, selectMapPermission, deleteActiveMap, updateThumbnail } = this.props
    const starclassName = mapIsStarred ? 'starred' : ''
    const tooltip = mapIsStarred ? 'Unstar' : 'Star'
    const onStarClick = mapIsStarred ? onMapUnstar : onMapStar
    return <div className="infoAndHelp">
      {map && <MapInfoBox {...{toggleInfoBox, currentUser, map, isNewMap, selectMapPermission, deleteActiveMap, updateThumbnail}} />}
      {map && currentUser && <div className={`starMap infoElement mapElement ${starclassName}`} onClick={onStarClick}>
        <div className="tooltipsAbove">{tooltip}</div>
      </div>}
      {map && <div className="mapInfoIcon infoElement mapElement" onClick={toggleInfoBox}>
        <div className="tooltipsAbove">Map Info</div>
      </div>}
      <div className="openCheatsheet infoElement mapElement" onClick={onHelpClick}>
        <div className="tooltipsAbove">Help</div>
      </div>
      <div className="clearfloat"></div>
    </div>
  }
}

export default InfoAndHelp
