function get(url) {
  return fetch(url, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function post(url, data = {}) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function postNoStringify(url, data = {}) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    body: data
  })
}

function put(url, data = {}) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function putNoStringify(url, data = {}) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'PUT',
    body: data
  })
}

function deleteReq(url) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

async function getMetacodes() {
  return get('/metacodes')
    .then(res => res.json())
}

async function getMetacodeSets() {
  return get('/metacode_sets')
    .then(res => res.json())
}

async function createMetacodeSet(metacodes, name, desc) {
  const data = {
    metacodes: {
      value: metacodes.toString()
    },
    metacode_set: {
      name,
      desc
    }
  }
  return post(`/metacode_sets`, data)
    .then(res => res.json())
}

async function updateMetacodeSet(id, metacodes, name, desc) {
  const data = {
    metacodes: {
      value: metacodes.toString()
    },
    metacode_set: {
      name,
      desc
    }
  }
  return put(`/metacode_sets/${id}`, data)
    .then(res => Promise.resolve(res.ok))
}

async function deleteMetacodeSet(id) {
  return deleteReq(`/metacode_sets/${id}`)
    .then(res => Promise.resolve(res.ok))
}

async function createMetacode(name, color, icon) {
  const formdata = new FormData()
  formdata.append('metacode[name]', name)
  formdata.append('metacode[color]', color)
  formdata.append('metacode[aws_icon]', icon)
  return postNoStringify(`/metacodes`, formdata)
}

async function updateMetacode(id, name, color, icon) {
  const formdata = new FormData()
  formdata.append('metacode[name]', name)
  formdata.append('metacode[color]', color)
  if (icon) formdata.append('metacode[aws_icon]', icon)
  return putNoStringify(`/metacodes/${id}`, formdata)
    .then(res => Promise.resolve(res.ok))
}

async function getCurrentUser() {
  return get('/users/current')
    .then(res => res.json())
}

async function updateUser(id, opts) {
  const formdata = new FormData()
  formdata.append('user[name]', opts.name)
  formdata.append('user[email]', opts.email)
  formdata.append('user[emails_allowed]', opts.emailsAllowed)
  formdata.append('current_password', opts.currentPassword)
  formdata.append('user[password]', opts.newPassword)
  formdata.append('user[password_confirmation]', opts.newPasswordConfirmation)
  formdata.append('settings[follow_topic_on_created]', opts.followTopicOnCreated)
  formdata.append('settings[follow_topic_on_contributed]', opts.followTopicOnContributed)
  formdata.append('settings[follow_map_on_created]', opts.followMapOnCreated)
  formdata.append('settings[follow_map_on_contributed]', opts.followMapOnContributed)
  formdata.append('remove_image', opts.removeImage)
  if (opts.image) formdata.append('user[image]', opts.image)
  return putNoStringify(`/users/${id}`, formdata)
    .then(res => res.json())
}

function changeMetacodeSet(set) {
  const data = {
    'metacodes': {
      'value': set
    }
  }
  return post('/user/updatemetacodes', data)
    .then(res => Promise.resolve(res.ok))
}

async function approveAccessRequest(mapId, requestId) {
  return post(`/maps/${mapId}/approve_access/${requestId}`)
    .then(res => Promise.resolve(res.ok))
}

async function denyAccessRequest(mapId, requestId) {
  return post(`/maps/${mapId}/deny_access/${requestId}`)
    .then(res => Promise.resolve(res.ok))
}

async function requestAccess(mapId) {
  return post(`/maps/${mapId}/access_request`)
    .then(res => Promise.resolve(res.ok))
}

module.exports = {
  getMetacodes,
  getMetacodeSets,
  createMetacodeSet,
  updateMetacodeSet,
  deleteMetacodeSet,
  createMetacode,
  updateMetacode,
  getCurrentUser,
  updateUser,
  changeMetacodeSet,
  approveAccessRequest,
  denyAccessRequest,
  requestAccess
}