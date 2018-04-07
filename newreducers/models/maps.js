import {
  fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store'

const MODEL = 'maps'
const PATH = '/api/v2/maps'

export function fetchMaps(params = {}) {
  return fetchCollection(MODEL, PATH, params)
}

export function fetchMap(id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}/${id}`, params)
}

export function createMap(data = {}) {
  return createRecord(MODEL, PATH, data)
}

export function updateMap(id, data = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data)
}

export function deleteMap(id) {
  return deleteRecord(MODEL, id, `${PATH}/${id}`)
}