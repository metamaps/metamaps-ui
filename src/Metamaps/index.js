
import createStore from '../store'

import Active from './Active'
import AutoLayout from './AutoLayout'
import Cable from './Cable'
import Control from './Control'
import Create from './Create'
import DataFetcher from './DataFetcher'
import Debug from './Debug'
import Filter from './Filter'
import GlobalUI from './GlobalUI'
import ReactApp from './GlobalUI/ReactApp'
import Import from './Import'
import JIT from './JIT'
import Listeners from './Listeners'
import Loading from './Loading'
import Map from './Map'
import Mouse from './Mouse'
import Organize from './Organize'
import PasteInput from './PasteInput'
import Realtime from './Realtime'
import Selected from './Selected'
import Settings from './Settings'
import Synapse from './Synapse'
import Topic from './Topic'
import Util from './Util'
import Views from './Views'
import Visualize from './Visualize'

const Metamaps = window.Metamaps || {}
Metamaps.Active = Active
Metamaps.AutoLayout = AutoLayout
Metamaps.Cable = Cable
Metamaps.Control = Control
Metamaps.Create = Create
Metamaps.DataFetcher = DataFetcher
Metamaps.Debug = Debug
Metamaps.Filter = Filter
Metamaps.GlobalUI = GlobalUI
Metamaps.GlobalUI.ReactApp = ReactApp
Metamaps.Import = Import
Metamaps.JIT = JIT
Metamaps.Listeners = Listeners
Metamaps.Loading = Loading
Metamaps.Map = Map
Metamaps.Maps = {}
Metamaps.Mouse = Mouse
Metamaps.Organize = Organize
Metamaps.PasteInput = PasteInput
Metamaps.Realtime = Realtime
Metamaps.Selected = Selected
Metamaps.Settings = Settings
Metamaps.Synapse = Synapse
Metamaps.Topic = Topic
Metamaps.Util = Util
Metamaps.Views = Views
Metamaps.Visualize = Visualize

function runInitFunctions(serverData, store) {
  // initialize all the modules
  for (const prop in Metamaps) {
    // this runs the init function within each sub-object on the Metamaps one
    if (Metamaps.hasOwnProperty(prop) &&
      Metamaps[prop] != null &&
      Metamaps[prop].hasOwnProperty('init') &&
      typeof (Metamaps[prop].init) === 'function'
    ) {
      Metamaps[prop].init(serverData, store)
    }
  }
}

// fetch data from API then pass into init functions
document.addEventListener('DOMContentLoaded', async function() {
  const store = createStore('http://localhost:3001/api/v2')
  // runInitFunctions(Metamaps.ServerData, store)
})

export default Metamaps
