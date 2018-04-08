import {
  fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store'

const MODEL = 'topics'
const PATH = '/api/v2/topics'

export function fetchTopics(params = {}) {
  return fetchCollection(MODEL, PATH, params)
}

export function fetchTopic(id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}/${id}`, params)
}

export function createTopic(data = {}) {
  return createRecord(MODEL, PATH, data)
}

export function updateTopic(id, data = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data)
}

export function deleteTopic(id) {
  return deleteRecord(MODEL, id, `${PATH}/${id}`)
}
