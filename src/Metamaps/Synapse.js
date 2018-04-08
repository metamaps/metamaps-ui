/* global $ */

import Active from './Active'
import Control from './Control'
import Create from './Create'
import Map from './Map'
import Selected from './Selected'
import Settings from './Settings'
import Visualize from './Visualize'

const noOp = () => {}

const Synapse = {
  renderSynapse: function(mapping, synapse, node1, node2, createNewInDB) {
    var edgeOnViz

    var newedge = synapse.createEdge(mapping)

    Visualize.mGraph.graph.addAdjacence(node1, node2, newedge.data)
    edgeOnViz = Visualize.mGraph.graph.getAdjacence(node1.id, node2.id)
    synapse.set('edge', edgeOnViz)
    synapse.updateEdge() // links the synapse and the mapping to the edge

    Control.selectEdge(edgeOnViz)

    var synapseSuccessCallback = function(synapseModel, response) {
      if (Active.Map) {
        mapping.save({ mappable_id: synapseModel.id }, {
          success: function(model, response) {
            if (Active.Mapper.get('follow_map_on_contributed')) {
              Active.Mapper.followMap(Active.Map.id)
            }
          },
          error: function(model, response) {
            console.log('error saving mapping to database')
          }
        })
      }
    }

    if (!Settings.sandbox && createNewInDB) {
      if (synapse.isNew()) {
        synapse.save(null, {
          success: synapseSuccessCallback,
          error: function(model, response) {
            console.log('error saving synapse to database')
          }
        })
      } else if (!synapse.isNew() && Active.Map) {
        mapping.save(null, {
          success: function(model, response) {
            if (Active.Mapper.get('follow_map_on_contributed')) {
              Active.Mapper.followMap(Active.Map.id)
            }
          },
          error: function(model, response) {
            console.log('error saving mapping to database')
          }
        })
      }
    }
  },
  createSynapseLocally: function() {
    var self = Synapse
    let topic1
    let topic2
    let node1
    let node2
    let synapse
    let mapping

    $(document).trigger(Map.events.editedByActiveMapper)

    // for each node in this array we will create a synapse going to the position2 node.
    var synapsesToCreate = []

    topic2 = DataModel.Topics.get(Create.newSynapse.topic2id)
    node2 = topic2.get('node')

    var len = Selected.Nodes.length
    if (len === 0) {
      topic1 = DataModel.Topics.get(Create.newSynapse.topic1id)
      synapsesToCreate[0] = topic1.get('node')
    } else if (len > 0) {
      synapsesToCreate = Selected.Nodes
    }

    for (var i = 0; i < synapsesToCreate.length; i++) {
      node1 = synapsesToCreate[i]
      topic1 = node1.getData('topic')
      synapse = new DataModel.Synapse({
        desc: Create.newSynapse.description,
        topic1_id: topic1.isNew() ? topic1.cid : topic1.id,
        topic2_id: topic2.isNew() ? topic2.cid : topic2.id
      })
      DataModel.Synapses.add(synapse)

      mapping = new DataModel.Mapping({
        mappable_type: 'Synapse',
        mappable_id: synapse.cid
      })
      DataModel.Mappings.add(mapping)

      // this function also includes the creation of the synapse in the database
      self.renderSynapse(mapping, synapse, node1, node2, true)
    } // for each in synapsesToCreate

    Create.newSynapse.hide()
  },
  getSynapseFromAutocomplete: function(id) {
    var self = Synapse

    self.get(id, synapse => {
      const mapping = new DataModel.Mapping({
        mappable_type: 'Synapse',
        mappable_id: synapse.id
      })
      DataModel.Mappings.add(mapping)
      const topic1 = DataModel.Topics.get(Create.newSynapse.topic1id)
      const node1 = topic1.get('node')
      const topic2 = DataModel.Topics.get(Create.newSynapse.topic2id)
      const node2 = topic2.get('node')
      Create.newSynapse.hide()
      self.renderSynapse(mapping, synapse, node1, node2, true)
    })
  }
}

export default Synapse
