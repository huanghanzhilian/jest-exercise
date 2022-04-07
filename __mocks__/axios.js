const axios = {
  get: jest.fn(() => Promise.resolve({
    data: { username: 'hjp hh' }
  }))
}

module.exports = axios
