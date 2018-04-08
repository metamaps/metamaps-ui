const TopicCard = {
  init: function(serverData, store) {
    TopicCard.store = store
  },
  showCard: function(node) {
    TopicCard.store.dispatch(updateOpenTopic(node.getData('topic')))
  },
  hideCard: function() {
    TopicCard.store.dispatch(updateOpenTopic(null))
  }
}

export default TopicCard
