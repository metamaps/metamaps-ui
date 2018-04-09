import {
  fetchMap
} from '../actions/models/maps'

function makeFetchMapParams(props) {
  return {
    // user_id: 1234
    embed: 'user,topics,synapses,mappings,contributors,collaborators'
  }
}

export function fetchMapAction(props) {
  const { id } = props.match.params
  return fetchMap(id, makeFetchMapParams(props))
}
