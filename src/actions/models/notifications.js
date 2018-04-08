import {
  fetchCollection, fetchRecord, updateRecord
} from 'redux-crud-store'

const MODEL = 'notifications'
const PATH = '/api/v2/notifications'

export function fetchNotifications(params = {}) {
  return fetchCollection(MODEL, PATH, params)
}

export function fetchNotification(id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}/${id}`, params)
}

export function updateNotification(id, data = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data)
}
