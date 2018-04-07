import 'babel-polyfill' // needed for IE 11, Edge 12, Safari 9
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'

import { createStore, applyMiddleware, compose } from 'redux'
import { crudSaga, ApiClient } from 'redux-crud-store'

const crudMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = compose(
  applyMiddleware(
    crudMiddleware
    // add other middlewares here...
  )
)(createStore)

export default function(apiUrl) {
  const client = new ApiClient({ basePath: apiUrl })
  const store = createStoreWithMiddleware(reducers, undefined)
  crudMiddleware.run(crudSaga(client))
  return store
}
