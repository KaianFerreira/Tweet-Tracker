import api from './api'

const sessionName = 'tweetTrackerSession'

const setToken = (token) => {
  localStorage.setItem(sessionName, JSON.stringify(token))
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export {
  setToken
}
