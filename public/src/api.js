const api = (function () {
  const API_BASE_URL = '/'
  const _post = function (endpoint, payload) {
    return fetch(endpoint, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload)
    })
    .then(function (res) { return res.json() })
  }
  
  const _get = function (endpoint) {
    return fetch(endpoint, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(function (res) { return res.json() })
  }

  return {
    saveMap: function (name, payload) {
      return _post(`${API_BASE_URL}/maps`, {
        name: name,
        map: payload
      })
    },

    getMap: function (name) {
      return _get(`${API_BASE_URL}/maps/${name}`)
    }
  }
})()
