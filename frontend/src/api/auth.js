import api from '../libs/api'
const twitterSignin = async () => {
  window.open('http://localhost:3000/auth/twitter')
}

const getUser = async () => {
  const { data } = await api.get('auth/user')
  return data
}

export {
  twitterSignin,
  getUser
}
