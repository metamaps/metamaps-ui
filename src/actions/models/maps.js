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

export function createMap(data = {}, params) {
  return createRecord(MODEL, PATH, data, params)
}

export function updateMap(id, data = {}, params = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data, params)
}

export function deleteMap(id, params) {
  return deleteRecord(MODEL, id, `${PATH}/${id}`, params)
}
