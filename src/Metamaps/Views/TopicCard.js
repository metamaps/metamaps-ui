const TopicCard = {
  openTopic: null,
  showCard: function(render, node) {
    debugger
    TopicCard.openTopic = node.getData('topic')
    render()
  },
  hideCard: function(render) {
    TopicCard.openTopic = null
    render()
  }
}

export default TopicCard
