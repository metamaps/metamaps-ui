/* global $ */

import Active from './Active'
import Create from './Create'
import Control from './Control'
import JIT from './JIT'
import Realtime from './Realtime'
import Selected from './Selected'
import Topic from './Topic'
import Util from './Util'
import Visualize from './Visualize'
import { Search } from './GlobalUI'

const Listeners = {
  init: function() {
    var self = this
    $(document).on('keydown', function(e) {
      if (!(Active.Map || Active.Topic)) return

      const onCanvas = e.target.tagName === 'BODY'

      switch (e.which) {
        case 13: // if enter key is pressed
          // prevent topic creation if sending a message
          if (e.target.className !== 'chat-input') {
            JIT.enterKeyHandler()
          }
          break
        case 27: // if esc key is pressed
          JIT.escKeyHandler()
          break
        case 38: // if UP key is pressed
          if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
            Control.selectNeighbors()
          }
          break
        case 46: // if DEL is pressed
          if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && (Selected.Nodes.length + Selected.Edges.length) > 0) {
            e.preventDefault()
            Control.removeSelectedNodes()
            Control.removeSelectedEdges()
          }
          break
        case 65: // if a or A is pressed
          if (Create.isSwitchingSet && e.ctrlKey || e.metaKey) {
            Create.metacodeSelectorToggleSelectAll()
            e.preventDefault()
            break
          } else if ((e.ctrlKey || e.metaKey) && onCanvas) {
            const nodesCount = Object.keys(Visualize.mGraph.graph.nodes).length
            const selectedNodesCount = Selected.Nodes.length
            e.preventDefault()

            // Hit Ctrl+A once to select all nodes
            Control.deselectAllNodes()
            Visualize.mGraph.graph.eachNode(node => {
              Control.selectNode(node, e)
            })

            // Hitting Ctrl+A a second time will select all edges too
            Control.deselectAllEdges()
            if (nodesCount === selectedNodesCount) {
              DataModel.Synapses.models.forEach(synapse => {
                const topic1id = synapse.get('topic1_id')
                const topic2id = synapse.get('topic2_id')
                const edge = Visualize.mGraph.graph.edges[topic1id][topic2id]
                Control.selectEdge(edge, e)
              })
            }

            Visualize.mGraph.plot()
          }

          break
        case 68: // if d or D is pressed
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            Control.deleteSelected()
          }
          break
        case 69: // if e or E is pressed
          if ((e.ctrlKey || e.metaKey) && Active.Map) {
            e.preventDefault()
            JIT.zoomExtents(null, Visualize.mGraph.canvas)
            break
          }
          if (e.altKey && Active.Topic) {
            e.preventDefault()

            if (Active.Topic) {
              self.centerAndReveal(Selected.Nodes, {
                center: true,
                reveal: false
              })
            }
            break
          }
          break
        case 72: // if h or H is pressed
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            Control.hideSelectedNodes()
            Control.hideSelectedEdges()
          }
          break
        case 77: // if m or M is pressed
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            Control.removeSelectedNodes()
            Control.removeSelectedEdges()
          }
          break
        case 82: // if r or R is pressed
          if (e.altKey && Active.Topic) {
            e.preventDefault()
            self.centerAndReveal(Selected.Nodes, {
              center: false,
              reveal: true
            })
          }
          break
        case 84: // if t or T is pressed
          if (e.altKey && Active.Topic) {
            e.preventDefault()
            self.centerAndReveal(Selected.Nodes, {
              center: true,
              reveal: true
            })
          }
          break
        case 191: // if / is pressed
          if (e.ctrlKey || e.metaKey) {
            Search.focus()
          }
          break
        default:
          // console.log(e.which)
          break
      }
    })
    $(window).resize(function() {
      if (Visualize && Visualize.mGraph) {
        Util.resizeCanvas(Visualize.mGraph.canvas)
      }

      if (Active.Map && Realtime.inConversation) Realtime.positionVideos()
    })
  },
  centerAndReveal: function(nodes, opts) {
    if (nodes.length < 1) return
    var node = nodes[nodes.length - 1]
    if (opts.center && opts.reveal) {
      Topic.centerOn(node.id, function() {
        Topic.fetchSiblings(nodes)
      })
    } else if (opts.center) {
      Topic.centerOn(node.id)
    } else if (opts.reveal) {
      Topic.fetchSiblings(nodes)
    }
  }
}

export default Listeners
