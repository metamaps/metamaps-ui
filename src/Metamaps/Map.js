/* global $ */

import outdent from 'outdent'

import Active from './Active'
import AutoLayout from './AutoLayout'
import Create from './Create'
import Filter from './Filter'
import GlobalUI, { ReactApp } from './GlobalUI'
import JIT from './JIT'
import Loading from './Loading'
import Realtime from './Realtime'
import Selected from './Selected'
import CreateMap from './Views/CreateMap'
import SynapseCard from './Views/SynapseCard'
import ContextMenu from './Views/ContextMenu'
import TopicCard from './Views/TopicCard'
import InfoBox from './Views/InfoBox'
import Visualize from './Visualize'

const Map = {
  events: {
    editedByActiveMapper: 'Metamaps:Map:events:editedByActiveMapper'
  },
  init: function(serverData, store) {
    Map.store = store
    $('#wrapper').mousedown(function(e) {
      if (e.button === 1) return false
    })
    $(document).on(Map.events.editedByActiveMapper, Map.editedByActiveMapper)
  },
  setHasLearnedTopicCreation: function(value) {
    Map.store.dispatch(updateHasLearnedTopicCreation(value))
  },
  requestAccess: function() {
    const requests = Array.from(Map.store.getState().requests).concat([{
      user_id: Active.Mapper.id,
      answered: false,
      approved: false
    }])
    Map.store.dispatch(updateRequests(requests))
    $.post({
      url: `/maps/${Active.Map.id}/access_request`
    })
    GlobalUI.notifyUser('Map creator will be notified of your request')
  },
  launch: function(id) {
    var dataIsReadySetupMap = function() {
      Visualize.type = 'ForceDirected'
      JIT.prepareVizData()
      Selected.reset()
      Filter.reset()
      Filter.checkMetacodes()
      Filter.checkSynapses()
      Filter.checkMappers()
      Realtime.startActiveMap()
      Loading.hide()
      document.title = Active.Map.get('name') + ' | Metamaps'
      Map.store.dispatch(updateMobileTitle(Active.Map.get('name')))
    }
    if (Active.Map && Active.Map.id === id) {
      dataIsReadySetupMap()
    } else {
      Loading.show()
      $.ajax({
        url: '/maps/' + id + '/contains.json',
        success: function(data) {
          Map.store.dispatch(updateMap(new DataModelMap(data.map)))
          DataModel.Mappers = new DataModel.MapperCollection(data.mappers)
          DataModel.Collaborators = new DataModel.MapperCollection(data.collaborators)
          DataModel.Topics = new DataModel.TopicCollection(data.topics)
          DataModel.Synapses = new DataModel.SynapseCollection(data.synapses)
          DataModel.Mappings = new DataModel.MappingCollection(data.mappings)
          DataModel.Messages = data.messages
          DataModel.Stars = data.stars
          DataModel.attachCollectionEvents()
          Map.store.dispatch(updateRequests(data.requests))
          dataIsReadySetupMap()
        },
        error: function(res) {
          // forbidden
          if (res.status === 403) {
            ReactApp.history.push(`/maps/${id}/request_access`)
          } else {
            GlobalUI.notifyUser('There was an error fetching the map')
          }
        }
      })
    }
  },
  end: function() {
    if (Active.Map) {
      $('.main').removeClass('compressed')
      AutoLayout.resetSpiral()
      ContextMenu.reset()
      TopicCard.hideCard()
      SynapseCard.hideCard()
      Create.newTopic.hide(true) // true means force (and override pinned)
      Create.newSynapse.hide()
      InfoBox.close()
      Realtime.endActiveMap()
      Map.store.dispatch(updateRequests([]))
      Map.store.dispatch(updateHasLearnedTopicCreation(true))
    }
  },
  star: function() {
    if (!Active.Map) return
    $.post('/maps/' + Active.Map.id + '/star')
    DataModel.Stars.push({ user_id: Active.Mapper.id, map_id: Active.Map.id })
    DataModel.Maps.Starred.add(Active.Map)
    GlobalUI.notifyUser('Map is now starred')
    Map.store.dispatch(updateMapIsStarred(true))
  },
  unstar: function() {
    if (!Active.Map) return
    $.post('/maps/' + Active.Map.id + '/unstar')
    DataModel.Stars = DataModel.Stars.filter(function(s) { return s.user_id !== Active.Mapper.id })
    DataModel.Maps.Starred.remove(Active.Map)
    Map.store.dispatch(updateMapIsStarred(false))
  },
  fork: function() {
    GlobalUI.openLightbox('forkmap')

    let nodesData = ''
    let synapsesData = ''
    let nodesArray = []
    let synapsesArray = []
    // collect the unfiltered topics
    Visualize.mGraph.graph.eachNode(function(n) {
      // if the opacity is less than 1 then it's filtered
      if (n.getData('alpha') === 1) {
        var id = n.getData('topic').id
        nodesArray.push(id)
        let x, y
        if (n.pos.x && n.pos.y) {
          x = n.pos.x
          y = n.pos.y
        } else {
          x = Math.cos(n.pos.theta) * n.pos.rho
          y = Math.sin(n.pos.theta) * n.pos.rho
        }
        nodesData += id + '/' + x + '/' + y + ','
      }
    })
    // collect the unfiltered synapses
    DataModel.Synapses.each(function(synapse) {
      var desc = synapse.get('desc')

      var descNotFiltered = Filter.visible.synapses.indexOf(desc) > -1
      // make sure that both topics are being added, otherwise, it
      // doesn't make sense to add the synapse
      var topicsNotFiltered = nodesArray.indexOf(synapse.get('topic1_id')) > -1
      topicsNotFiltered = topicsNotFiltered && nodesArray.indexOf(synapse.get('topic2_id')) > -1
      if (descNotFiltered && topicsNotFiltered) {
        synapsesArray.push(synapse.id)
      }
    })

    synapsesData = synapsesArray.join()
    nodesData = nodesData.slice(0, -1)

    CreateMap.topicsToMap = nodesData
    CreateMap.synapsesToMap = synapsesData
  },
  leavePrivateMap: function() {
    var map = Active.Map
    DataModel.Maps.Active.remove(map)
    DataModel.Maps.Featured.remove(map)
    ReactApp.history.push('/')
    GlobalUI.notifyUser('Sorry! That map has been changed to Private.')
  },
  cantEditNow: function() {
    Realtime.turnOff(true) // true is for 'silence'
    GlobalUI.notifyUser('Map was changed to Public. Editing is disabled.')
    Active.Map.trigger('changeByOther')
  },
  canEditNow: function() {
    var confirmString = "You've been granted permission to edit this map. "
    confirmString += 'Do you want to reload and enable realtime collaboration?'
    var c = window.confirm(confirmString)
    if (c) {
      window.location.reload()
    }
  },
  editedByActiveMapper: function() {
    if (Active.Mapper) {
      DataModel.Mappers.add(Active.Mapper)
    }
  },
  offerScreenshotDownload: () => {
    const canvas = Map.getMapCanvasForScreenshots()
    const filename = Map.getMapScreenshotFilename(Active.Map)

    var downloadMessage = outdent`
      Captured map screenshot!
      <a id="map-screenshot-download-link"
         href="${canvas.canvas.toDataURL()}"
         download="${filename}"
      >
        DOWNLOAD
      </a>`
    GlobalUI.notifyUser(downloadMessage)
  },
  uploadMapScreenshot: (map) => {
    const canvas = Map.getMapCanvasForScreenshots()
    const filename = Map.getMapScreenshotFilename(map)

    canvas.canvas.toBlob(imageBlob => {
      const formData = new window.FormData()
      formData.append('map[screenshot]', imageBlob, filename)
      $.ajax({
        type: 'PATCH',
        dataType: 'json',
        url: `/maps/${map.id}`,
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
          GlobalUI.notifyUser('Successfully updated map screenshot.')
        },
        error: function() {
          GlobalUI.notifyUser('Failed to update map screenshot.')
        }
      })
    })
  },
  getMapCanvasForScreenshots: () => {
    var canvas = {}

    canvas.canvas = document.createElement('canvas')
    canvas.canvas.width = 1880 // 960
    canvas.canvas.height = 1260 // 630

    canvas.scaleOffsetX = 1
    canvas.scaleOffsetY = 1
    canvas.translateOffsetY = 0
    canvas.translateOffsetX = 0
    canvas.denySelected = true

    canvas.getSize = function() {
      if (this.size) return this.size
      var canvas = this.canvas
      this.size = {
        width: canvas.width,
        height: canvas.height
      }
      return this.size
    }
    canvas.scale = function(x, y) {
      const px = this.scaleOffsetX * x
      const py = this.scaleOffsetY * y
      const dx = this.translateOffsetX * (x - 1) / px
      const dy = this.translateOffsetY * (y - 1) / py
      this.scaleOffsetX = px
      this.scaleOffsetY = py
      this.getCtx().scale(x, y)
      this.translate(dx, dy)
    }
    canvas.translate = function(x, y) {
      const sx = this.scaleOffsetX
      const sy = this.scaleOffsetY
      this.translateOffsetX += x * sx
      this.translateOffsetY += y * sy
      this.getCtx().translate(x, y)
    }
    canvas.getCtx = function() {
      return this.canvas.getContext('2d')
    }
    // center it
    canvas.getCtx().translate(1880 / 2, 1260 / 2)

    var mGraph = Visualize.mGraph

    var id = mGraph.root
    var root = mGraph.graph.getNode(id)
    var T = !!root.visited

    // pass true to avoid basing it on a selection
    JIT.zoomExtents(null, canvas, true)

    const c = canvas.canvas
    const ctx = canvas.getCtx()
    const scale = canvas.scaleOffsetX

    // draw a grey background
    ctx.fillStyle = '#d8d9da'
    const xPoint = (-(c.width / scale) / 2) - (canvas.translateOffsetX / scale)
    const yPoint = (-(c.height / scale) / 2) - (canvas.translateOffsetY / scale)
    ctx.fillRect(xPoint, yPoint, c.width / scale, c.height / scale)

    // draw the graph
    mGraph.graph.eachNode(function(node) {
      var nodeAlpha = node.getData('alpha')
      node.eachAdjacency(function(adj) {
        var nodeTo = adj.nodeTo
        if (!!nodeTo.visited === T && node.drawn && nodeTo.drawn) {
          mGraph.fx.plotLine(adj, canvas)
        }
      })
      if (node.drawn) {
        mGraph.fx.plotNode(node, canvas)
      }
      if (!mGraph.labelsHidden) {
        if (node.drawn && nodeAlpha >= 0.95) {
          mGraph.labels.plotLabel(canvas, node)
        } else {
          mGraph.labels.hideLabel(node, false)
        }
      }
      node.visited = !T
    })

    return canvas
  },
  getMapScreenshotFilename: map => {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 // January is 0!
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = mm + '/' + dd + '/' + yyyy

    var mapName = map.get('name').split(' ').join(['-'])
    const filename = `metamap-${map.id}-${mapName}-${today}.png`
    return filename
  }
}

export default Map
