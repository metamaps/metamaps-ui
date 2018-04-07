import {
  fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store'

const MODEL = 'mappings'
const PATH = '/api/v2/mappings'

export function fetchMappings(params = {}) {
  return fetchCollection(MODEL, PATH, params)
}

export function fetchMapping(id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}/${id}`, params)
}

export function createMapping(data = {}) {
  return createRecord(MODEL, PATH, data)
}

export function updateMapping(id, data = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data)
}

export function deleteMapping(id) {
  return deleteRecord(MODEL, id, `${PATH}/${id}`)
}