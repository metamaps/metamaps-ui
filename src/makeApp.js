import React from 'react'
import {
  Link,
  Route,
  Router
} from 'react-router-dom'
import { Provider } from 'react-redux'

import LoggedOutHome from './routes/LoggedOutHome'
import RequestInvite from './routes/RequestInvite'

import App from './containers/AppContainer'
import Maps from './containers/MapsContainer'
import MapView from './containers/MapViewContainer'
import Metacodes from './containers/MetacodesContainer'
import NewMetacode from './containers/NewMetacodeContainer'
import EditMetacode from './containers/EditMetacodeContainer'
import MetacodeSets from './containers/MetacodeSetsContainer'
import NewMetacodeSet from './containers/NewMetacodeSetContainer'
import EditMetacodeSet from './containers/EditMetacodeSetContainer'
import Notifications from './containers/NotificationsContainer'
import NotificationPage from './containers/NotificationPageContainer'
import TopicView from './containers/TopicViewContainer'
import RequestAccess from './containers/RequestAccessContainer'
import Login from './containers/LoginContainer'
import Join from './containers/JoinContainer'
import UserSettings from './containers/UserSettingsContainer'

function nullComponent(props) {
  return null
}

export default function makeApp (currentUser, history, store) {
  const homeComponent = currentUser && currentUser.id ? Maps : LoggedOutHome
  return <Provider store={store}>
    <Router history={history}>
      <Route path="/" children={(props) => (<App {...props}>
        <div>
          <Route path="/" exact component={homeComponent} />
          {!currentUser && <Route path="/login" exact component={Login} />}
          {!currentUser && <Route path="/join" exact component={Join} />}
          {!currentUser && <Route path="/request" exact component={RequestInvite} />}
          <Route path="/explore/active" exact component={Maps} />
          <Route path="/explore/featured" exact component={Maps} />
          <Route path="/explore/mine" exact component={Maps} />
          <Route path="/explore/shared" exact component={Maps} />
          <Route path="/explore/starred" exact component={Maps} />
          <Route path="/explore/mapper/:id" exact component={Maps} />
          <Route path="/maps/:id" exact component={MapView} />
          <Route path="/maps/:id/request_access" exact component={RequestAccess} />
          <Route path="/topics/:id" exact component={TopicView} />
          <Route path="/notifications" exact component={Notifications} />
          <Route path="/notifications/:id" exact component={NotificationPage} />
          <Route path="/users/:id/edit" exact component={UserSettings} />
          <Route path="/users/password" exact component={nullComponent} />
          <Route path="/users/password/new" exact component={nullComponent} />
          <Route path="/users/password/edit" exact component={nullComponent} />
          <Route path="/metacodes" exact component={Metacodes} />
          <Route path="/metacodes/new" exact component={NewMetacode} />
          <Route path="/metacodes/:id/edit" exact component={EditMetacode} />
          <Route path="/metacode_sets" exact component={MetacodeSets} />
          <Route path="/metacode_sets/new" exact component={NewMetacodeSet} />
          <Route path="/metacode_sets/:id/edit" exact component={EditMetacodeSet} />
        </div>
      </App>)}/>
    </Router>
  </Provider>
}
