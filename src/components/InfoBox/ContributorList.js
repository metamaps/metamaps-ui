import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import onClickOutsideAddon from 'react-onclickoutside'

class ContributorList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleContributorList = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleClickOutside = () => {
    this.setState({
      open: false
    })
  }

  render = () => {
    const { isCreator, relevantPeople, userId, removeCollaborator } = this.props

    const contributorCount = relevantPeople.length
    let contributorsClass = relevantPeople.length > 1 ? 'multiple' : ''
    contributorsClass += relevantPeople.length === 2 ? ' mTwo' : ''
    const contributorImage = relevantPeople.length > 0 ? relevantPeople.models[0].get('image') : '/images/user.png'

    return (
      <div className="infoStatIcon mapContributors hoverForTip">
        <img id="mapContribs" className={contributorsClass} onClick={this.toggleContributorList}
          width="25" height="25" src={contributorImage} />
        <span className="count" onClick={this.toggleContributorList}>{contributorCount}</span>
        <div className="tip" style={{ display: this.state.open ? 'block' : 'none' }}>
          <ul>
            {relevantPeople.map((m, index) => {
              const personIsCreator = userId === m.get('id')
              return (
                <li key={index}>
                  <Link to={`/explore/mapper/${m.get('id')}`}>
                    <img className="rtUserImage" width="25" height="25" src={m.get('image')} />
                    {m.get('name')}
                    {personIsCreator && ' (creator)'}
                  </Link>
                  {isCreator && !personIsCreator && <span className="removeCollaborator" onClick={() => removeCollaborator(m.id)}></span>}
                </li>
              )
            })}
          </ul>
          {isCreator && <div className="collabSearchField">
            <span className="addCollab"></span>
            <input className="collaboratorSearchField" placeholder="Add a collaborator" />
          </div>}
        </div>
      </div>
    )
  }
}

export default onClickOutsideAddon(ContributorList)
