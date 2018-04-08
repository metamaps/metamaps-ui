import {
  SET_JUNTO_STATE
} from '../actions'

export default function(state = {
  connectedPeople: {},
  liveMaps: {}
}, action) {
  const { type, payload } = action
  if (type === SET_JUNTO_STATE) return payload
  else return state
}
