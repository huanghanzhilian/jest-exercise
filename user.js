const axios = require('axios')

module.exports = function getUserName(id) {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(resp => {
    return resp.data.username
  })
}
