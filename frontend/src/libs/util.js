import api from './api'
import { getUser } from '../api/auth'

const sessionName = 'tweetTrackerSession'

const getToken = () => JSON.parse(localStorage.getItem(sessionName))

// set header with encoded oauth token
// then get the same oauth token but decoded
const setToken = async (token) => {
  api.defaults.headers.twitterAuth = JSON.stringify(token)
  const data = await getUser()
  api.defaults.headers.decodedCredentials = JSON.stringify(data)
  localStorage.setItem(sessionName, JSON.stringify(data))
}

const removeToken = () => {
  localStorage.removeItem(sessionName)
}

export {
  getToken,
  setToken,
  removeToken
}
