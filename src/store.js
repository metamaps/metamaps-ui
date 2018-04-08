import 'babel-polyfill' // needed for IE 11, Edge 12, Safari 9
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { crudSaga, ApiClient } from 'redux-crud-store'

import reducers from './reducers'

const crudMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    crudMiddleware,
    thunk
  )
)(createStore)

export default function(apiUrl) {
  const client = new ApiClient({ basePath: apiUrl })
  const store = createStoreWithMiddleware(reducers, undefined)
  crudMiddleware.run(crudSaga(client))
  return store
}
