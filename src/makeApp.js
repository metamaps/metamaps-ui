import React from 'react'
import {
  Link,
  Route,
  Router
} from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './containers/AppContainer'
import Maps from './containers/MapsContainer'
import MapView from './containers/MapViewContainer'
import Metacodes from './routes/Admin/Metacodes'
import NewMetacode from './routes/Admin/NewMetacode'
import EditMetacode from './routes/Admin/EditMetacode'
import MetacodeSets from './routes/Admin/MetacodeSets'
import NewMetacodeSet from './routes/Admin/NewMetacodeSet'
import EditMetacodeSet from './routes/Admin/EditMetacodeSet'
import Notifications from './routes/Notifications/Notifications'
import NotificationPage from './routes/Notifications/NotificationPage'
import TopicView from './routes/TopicView'
import LoggedOutHome from './routes/LoggedOutHome'
import RequestAccess from './routes/RequestAccess'
import RequestInvite from './routes/RequestInvite'
import Login from './routes/Login'
import Join from './routes/Join'
import UserSettings from './routes/UserSettings'

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
