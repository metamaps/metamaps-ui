/* global $ */
import Control from '../Control'

const SynapseCard = {
  openSynapse: null,
  synapseCardSynapses: [],
  mouse: {
    x: 0,
    y: 0
  },
  showCard: function(render, edge, x, y) {
    // so label is missing while editing
    Control.deselectEdge(edge)
    const index = edge.getData('displayIndex') ? edge.getData('displayIndex') : 0
    const synapse = edge.getData('synapses')[index]
    SynapseCard.openSynapse = synapse
    SynapseCard.synapseCardSynapses = edge.getData('synapses')
    if (x && y) {
      SynapseCard.mouse = { x, y }
    }
    render()
  },
  hideCard: function(render) {
    SynapseCard.openSynapse = null
    SynapseCard.synapseCardSynapses = []
    render()
  },
  onSynapseCardMount: function(render, plot, synapse) {
    $('#edit_synapse.permission.canEdit .best_in_place').best_in_place()
    $('#edit_synapse_desc').keypress(function(e) {
      const ENTER = 13
      if (e.which === ENTER) {
        $(this).data('bestInPlaceEditor').update()
      }
    })
    $('#edit_synapse_desc').bind('ajax:success', function() {
      var desc = $(this).html()
      if (desc === 'Click to add description.') {
        synapse.set('desc', '')
      } else {
        synapse.set('desc', desc)
      }
      synapse.trigger('saved')
      Control.selectEdge(synapse.get('edge'))
      plot() // the datavis
      render() // the react ui
    })
  },
  onDirectionChange: function(render, plot, synapse, category, direction) {
    synapse.save({
      category: category,
      topic1_id: direction[0],
      topic2_id: direction[1]
    })
    plot()
    render()
  },
  onPermissionSelect: function(render, synapse, permission) {
    synapse.save({
      permission: permission,
      defer_to_map_id: null
    })
    render()
  },
  onSynapseSelect: function(render, plot, synapse, index) {
    const edge = synapse.get('edge')
    edge.setData('displayIndex', index)
    plot()
    SynapseCard.showCard(render, edge)
  }
}

export default SynapseCard
