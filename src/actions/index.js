
export const SET_HAS_LEARNED_TOPIC_CREATION = 'SET_HAS_LEARNED_TOPIC_CREATION'
export const UPDATE = 'UPDATE'

export function setHasLearnedTopicCreation(value) {
  return {
    type: SET_HAS_LEARNED_TOPIC_CREATION,
    payload: value
  }
}