import {
  fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store'

const MODEL = 'synapses'
const PATH = '/api/v2/synapses'

export function fetchSynapses(params = {}) {
  return fetchCollection(MODEL, PATH, params)
}

export function fetchSynapse(id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}/${id}`, params)
}

export function createSynapse(data = {}) {
  return createRecord(MODEL, PATH, data)
}

export function updateSynapse(id, data = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data)
}

export function deleteSynapse(id) {
  return deleteRecord(MODEL, id, `${PATH}/${id}`)
}
