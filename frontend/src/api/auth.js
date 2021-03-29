import api from '../libs/api'

// singin url from the backend
const twitterSignin = async () => {
  window.open('http://192.168.0.106:3000/auth/twitter')
}

const getUser = async () => {
  const { data } = await api.get('auth/user')
  return data
}

export {
  twitterSignin,
  getUser
}
