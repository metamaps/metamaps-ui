import React, { Component } from 'react'

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
      <div className="infoStatIcon mapContributors hoverForTip" onClick={this.toggleContributorList}>
        <img id="mapContribs" className={contributorsClass}
          width="25" height="25" src={contributorImage} />
        <span className="count">{contributorCount}</span>
        {this.state.open && <div className="tip">
          <ul>
            {relevantPeople.map((m) => {
              const personIsCreator = userId === m.get('id')
              return (
                <li>
                  <a href={`/explore/mapper/${m.get('id')}`}>
                    <img className="rtUserImage" width="25" height="25" src={m.get('image')} />
                    {m.get('name')}
                    {isCreator && ' (creator)'}
                  </a>
                  {isCreator && !personIsCreator && <span className="removeCollaborator" onClick={() => removeCollaborator(m.id)}></span>}
                </li>
              )
            })}
          </ul>
          {isCreator && <div className="collabSearchField">
            <span className="addCollab"></span>
            <input className="collaboratorSearchField" placeholder="Add a collaborator" />
          </div>}
        </div>}
      </div>
    )
  }
}

export default onClickOutsideAddon(ContributorList)