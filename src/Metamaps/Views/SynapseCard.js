/* global $ */
import {
  updateOpenSynapse,
  updateSynapseCardSynapses,
  updateSynapseCardPosition
} from '../../actions'
import Control from '../Control'

const SynapseCard = {
  init: function(serverData, store) {
    SynapseCard.store = store
  },
  showCard: function(edge, x, y) {
    // so label is missing while editing
    Control.deselectEdge(edge)
    const index = edge.getData('displayIndex') ? edge.getData('displayIndex') : 0
    const synapse = edge.getData('synapses')[index]
    SynapseCard.store.dispatch(updateOpenSynapse(synapse))
    SynapseCard.store.dispatch(updateSynapseCardSynapses(edge.getData('synapses')))
    if (x && y) {
      SynapseCard.store.dispatch(updateSynapseCardPosition({ x, y }))
    }
  },
  hideCard: function() {
    SynapseCard.store.dispatch(updateOpenSynapse(null))
    SynapseCard.store.dispatch(updateSynapseCardSynapses([]))
  },
  onSynapseCardMount: function(plot, synapse) {
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
    })
  },
  onDirectionChange: function(plot, synapse, category, direction) {
    synapse.save({
      category: category,
      topic1_id: direction[0],
      topic2_id: direction[1]
    })
    plot()
  },
  onPermissionSelect: function(synapse, permission) {
    synapse.save({
      permission: permission,
      defer_to_map_id: null
    })
  },
  onSynapseSelect: function(plot, synapse, index) {
    const edge = synapse.get('edge')
    edge.setData('displayIndex', index)
    plot()
    SynapseCard.showCard(edge)
  }
}

export default SynapseCard