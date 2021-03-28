import axios from 'axios'
import Twitter from 'twitter'
import uuid from 'uuid'

//use for standard v1.1 twitter api
const clientTwitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: '1375660968399757313-R6vRArllxTldjTV8WnSY4flnGUqCYb',
  access_token_secret: 'eKsLhP2U6sfiBiReiS7KqwwUhGKlVPcdMnazICWnK9hnt'
})


// use for user based app v2 twitter api
const clientUserTwitterV2 = (method, path = '/tweets/search/recent', config, userToken) => {
  const oauthTimestamp = Math.floor(Date.now() / 1000)
  const oauthNonce = uuid.v1()
  const api = axios.create({
    baseURL: 'https://api.twitter.com/2',
    headers: {
      'Authorization': 'OAuth '+
        `oauth_consumer_key="${process.env.TWITTER_CONSUMER_KEY}",`+
        `oauth_token="${userToken}",`+
        'oauth_signature_method="HMAC-SHA1",'+
        'oauth_version="1.0",'+
        `oauth_timestamp="${oauthTimestamp}",`+
        `oauth_nonce="${oauthNonce}",`+
        'oauth_signature="gAs18E9C9E%2FekPu3YrZb%2FJqwqdc%3D"'
    }
  })
  return api[method](`${path}`, config)
}

//use for standard v2 twitter api
const clientTwitterV2 = (method, path = '/tweets/search/recent', config) => {
  const api = axios.create ({
    baseURL: 'https://api.twitter.com/2/',
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  })
  return api[method](`${path}`, config)
}

const getLocalization = async (localId) => {
  try {
    const localization = new Promise((resolve, reject) => {
      clientTwitter.get(`geo/id/${localId}`, {}, (error, tweets, response) => {
        resolve(response)
        reject(error)
      })
    })
    return localization.centroid
  } catch (error) {
    console.log(error)
  }
}

// get bearer token for renew porpuses
const getBearerToken = async () => {
  try {
    const credentials = `${process.env.TWITTER_CONSUMER_KEY}:${process.env.TWITTER_CONSUMER_SECRET}`
    const credentialsBase64Encoded = Buffer.from(credentials).toString('base64')
    const { data } = await axios.post('https://api.twitter.com/oauth2/token?grant_type=client_credentials', {},
    {
      headers: {
        'Authorization': `Basic ${credentialsBase64Encoded}`,
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }

}

export {
  getLocalization,
  clientTwitter,
  clientTwitterV2,
  clientUserTwitterV2,
  getBearerToken
}