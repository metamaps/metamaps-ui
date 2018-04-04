import { combineReducers } from 'redux'

import maps from './maps'
import messages from './messages'
import users from './users'
import topics from './topics'
import mappings from './mappings'
import synapses from './synapses'
import requests from './requests'
import stars from './stars'
import follows from './follows'
import events from './events'
import metacodes from './metacodes'
import metacodeSets from './metacodeSets'
import notifications from './notifications'

export default combineReducers({
  maps,
  messages,
  users,
  topics,
  mappings,
  synapses,
  requests,
  stars,
  follows,
  events,
  metacodes,
  metacodeSets,
  notifications
})
