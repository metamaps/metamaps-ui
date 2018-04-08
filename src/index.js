import {} from 'jquery-ujs'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import createStore from './store'
import makeApp from './makeApp'
// import Metamaps from './Metamaps'

// create global references
window._ = _
// window.Metamaps = Metamaps

document.addEventListener('DOMContentLoaded', async function() {
  const store = createStore('http://localhost:3000')
  const history = createHistory()
  const app = makeApp(history, store)
  ReactDOM.render(app, document.getElementById('app'))
})
