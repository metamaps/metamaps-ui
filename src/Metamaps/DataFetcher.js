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
  const res = await get('/metacodes')
  const data = await res.json()
  return data
}

async function getMetacodeSets() {
  const res = await get('/metacode_sets')
  const data = await res.json()
  return data
}

async function createMetacodeSet(metacodes, name, desc) {
  const res = await post(`/metacode_sets`, {
    metacodes: {
      value: metacodes.toString()
    },
    metacode_set: {
      name,
      desc
    }
  })
  if (!res.ok) {
    throw new Error()
    return
  }
  const data = await res.json()
  return data
}

async function updateMetacodeSet(id, metacodes, name, desc) {
  const res = await put(`/metacode_sets/${id}`, {
    metacodes: {
      value: metacodes.toString()
    },
    metacode_set: {
      name,
      desc
    }
  })
  if (!res.ok) {
    throw new Error()
    return
  }
  return true
}

async function deleteMetacodeSet(id) {
  const res = await deleteReq(`/metacode_sets/${id}`)
  return res.ok
}

async function createMetacode(name, color, icon) {
  const formdata = new FormData()
  formdata.append('metacode[name]', name)
  formdata.append('metacode[color]', color)
  formdata.append('metacode[aws_icon]', icon)
  const res = await postNoStringify(`/metacodes`, formdata)
  if (!res.ok) {
    throw new Error()
    return
  }
  const data = await res.json()
  return data
}

async function updateMetacode(id, name, color, icon) {
  const formdata = new FormData()
  formdata.append('metacode[name]', name)
  formdata.append('metacode[color]', color)
  if (icon) formdata.append('metacode[aws_icon]', icon)
  const res = await putNoStringify(`/metacodes/${id}`, formdata)
  return res.ok
}

async function getCurrentUser() {
  const res = await get('/users/current')
  const data = await res.json()
  return data
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
  const res = await putNoStringify(`/users/${id}`, formdata)
  return res
}

function changeMetacodeSet(set) {
  return post('/user/updatemetacodes', {
    'metacodes': {
      'value': set
    }
  }).then(res => res.ok)
}

async function approveAccessRequest(mapId, requestId) {
  const res = await post(`/maps/${mapId}/approve_access/${requestId}`)
  return res.ok
}

async function denyAccessRequest(mapId, requestId) {
  const res = await post(`/maps/${mapId}/deny_access/${requestId}`)
  return res.ok
}

async function requestAccess(mapId) {
  const res = await post(`/maps/${mapId}/access_request`)
  return res.ok
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