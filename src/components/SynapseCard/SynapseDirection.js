import React, { Component } from 'react'

class SynapseDirection extends Component {

  onLeftClick = (leftId, rightId, toLeft, toRight) => {
    const { synapse, onDirectionChange } = this.props
    const newLeft = !toLeft
    let dir = synapse.getDirection()
    let dirCat = 'none'
    if (newLeft && toRight) {
      dirCat = 'both'
    } else if (!newLeft && toRight) {
      dirCat = 'from-to'
      dir = [rightId, leftId]
    } else if (newLeft && !toRight) {
      dirCat = 'from-to'
      dir = [leftId, rightId]
    }
    onDirectionChange(synapse, dirCat, dir)
  }

  onRightClick = (leftId, rightId, toLeft, toRight) => {
    const { synapse, onDirectionChange } = this.props
    const newRight = !toRight
    let dir = synapse.getDirection()
    let dirCat = 'none'
    if (toLeft && newRight) {
      dirCat = 'both'
    } else if (!toLeft && newRight) {
      dirCat = 'from-to'
      dir = [rightId, leftId]
    } else if (toLeft && !newRight) {
      dirCat = 'from-to'
      dir = [leftId, rightId]
    }
    onDirectionChange(synapse, dirCat, dir)
  }

  render = () => {
    const { synapse, canEdit } = this.props
    const edge = synapse.get('edge')
    // determine which node is to the left and the right
    // if directly in a line, top is left
    let left
    let right
    if (edge.nodeFrom.pos.x < edge.nodeTo.pos.x ||
      edge.nodeFrom.pos.x === edge.nodeTo.pos.x &&
      edge.nodeFrom.pos.y < edge.nodeTo.pos.y) {
      left = edge.nodeTo.getData('topic')
      right = edge.nodeFrom.getData('topic')
    } else {
      left = edge.nodeFrom.getData('topic')
      right = edge.nodeTo.getData('topic')
    }

    /*
     * One node is actually on the left onscreen. Call it left, & the other right.
     * If category is from-to, and that node is first, check the 'right' checkbox.
     * Else check the 'left' checkbox since the arrow is incoming.
     */

    const directionCat = synapse.get('category') // both, none, from-to
    let toLeft = false, toRight = false
    if (directionCat === 'from-to') {
      const fromTo = [synapse.get('topic1_id'), synapse.get('topic2_id')]
      if (fromTo[0] === left.id) {
        // check left checkbox
        toLeft = true
      } else {
        // check right checkbox
        toRight = true
      }
    } else if (directionCat === 'both') {
      // check both checkboxes
      toLeft = true
      toRight = true
    }

    return (
      <div>
        <div id="edit_synapse_left" className={toLeft ? 'checked' : ''}
             onClick={() => canEdit && this.onLeftClick(left.id, right.id, toLeft, toRight)} />
        <div id="edit_synapse_right" className={toRight ? 'checked' : ''}
             onClick={() => canEdit && this.onRightClick(left.id, right.id, toLeft, toRight)} />
      </div>
    )
  }
}

export default SynapseDirection