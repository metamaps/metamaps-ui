export default function(state = {}, action) {
  const { type, baseActionType } = action
  if (type.endsWith('_PENDING')) {
    return Object.assign({}, state, {[baseActionType]: true})
  } else if (type.endsWith('_COMPLETED') || type.endsWith('_FAILED')) {
    return Object.assign({}, state, {[baseActionType]: false})
  } else {
    return state
  }
}
