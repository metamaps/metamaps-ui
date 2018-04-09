import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { authorizeToEdit } from '../authorizing'
import FilterBox from '../containers/componentContainers/FilterBox'

export default class UpperOptions extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    map: PropTypes.object,
    topic: PropTypes.object,
    canEditMap: PropTypes.bool,
    onImportClick: PropTypes.func,
    onForkClick: PropTypes.func,
    filterData: PropTypes.object,
    allForFiltering: PropTypes.object,
    visibleForFiltering: PropTypes.object,
    toggleMetacode: PropTypes.func,
    toggleMapper: PropTypes.func,
    toggleSynapse: PropTypes.func,
    filterAllMetacodes: PropTypes.func,
    filterAllMappers: PropTypes.func,
    filterAllSynapses: PropTypes.func
  }

  render() {
    const { isMap, map, filtersOpen, currentUser, onImportClick, onForkClick,
      toggleFilters, location, history, match } = this.props
    return <div className="mapElement upperRightEl upperRightMapButtons upperRightUI">
      {isMap && authorizeToEdit(map, currentUser.id) && <div className="importDialog upperRightEl upperRightIcon mapElement" onClick={onImportClick}>
        <div className="tooltipsUnder">
          Import Data
        </div>
      </div>}
      <div className="sidebarFilter upperRightEl">
        <div className="sidebarFilterIcon upperRightIcon ignore-react-onclickoutside" onClick={toggleFilters}>
          <div className="tooltipsUnder">Filter</div>
        </div>
        {filtersOpen && <FilterBox location={location} history={history} match={match} />}
      </div>
      {currentUser && <div className="sidebarFork upperRightEl">
        <div className="sidebarForkIcon upperRightIcon" onClick={onForkClick}>
          <div className="tooltipsUnder">Save To New Map</div>
        </div>
      </div>}
      <div className="clearfloat"></div>
    </div>
  }
}
