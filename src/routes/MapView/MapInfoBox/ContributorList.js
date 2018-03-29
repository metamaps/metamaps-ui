import React, { Component } from 'react'

class ContributorList extends Component {
  render = () => {
    const { isCreator, relevantPeople, userId } = this.props
    return (
      <div>
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
                {isCreator && !personIsCreator && <span className="removeCollaborator" data-id={m.get('id')}></span>}
              </li>
            )
          })}
        </ul>
        {isCreator && <div className="collabSearchField">
          <span className="addCollab"></span>
          <input className="collaboratorSearchField" placeholder="Add a collaborator" />
        </div>}
      </div>
    )
  }
}

export default ContributorList