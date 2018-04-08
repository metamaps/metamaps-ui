export default function(state = {}, action) {
  const { type, baseActionType, error } = action
  if (type.endsWith('_FAILED')) {
    return Object.assign({}, state, {[baseActionType]: error})
  } else if (type.endsWith('_COMPLETED') || type.endsWith('_PENDING')) {
    return Object.assign({}, state, {[baseActionType]: null})
  } else {
    return state
  }
}
