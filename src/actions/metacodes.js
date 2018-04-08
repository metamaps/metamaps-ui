import {
  fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store'

const MODEL = 'metacodes'
const PATH = '/api/v2/metacodes'

export function fetchMetacodes(params = {}) {
  return fetchCollection(MODEL, PATH, params)
}

export function fetchMetacode(id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}/${id}`, params)
}

export function createMetacode(data = {}) {
  return createRecord(MODEL, PATH, data)
}

export function updateMetacode(id, data = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data)
}

export function deleteMetacode(id) {
  return deleteRecord(MODEL, id, `${PATH}/${id}`)
}
