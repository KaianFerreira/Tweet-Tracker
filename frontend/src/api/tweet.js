import api from '../libs/api'

const getLocationsByHashTag = async (hashtag) => {
  const { data } = await api.get(`tweet/hashtag/${hashtag}/locations`)
  return data
}

export {
  getLocationsByHashTag
}
