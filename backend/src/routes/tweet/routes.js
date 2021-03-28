import express from 'express'
import Joi from 'joi'
import { clientTwitterV2, clientStandardTwitter } from '../config/twitter-api'


const router = express.Router()

router.get('/hashtag/:name', async (req, res) => {
  try {
    console.log('GET /tweet/hashtag/:name')
    const joiSchema = Joi.object().keys({ name: Joi.string().required() })
    const { value, error } = joiSchema.validate(req.params)

    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['hashtag'] })
    }
    const config = {
      params: {
        query: `#${value.name}`,
        'tweet.fields': 'geo'
      }
    }
    const { data } = await clientTwitterV2('get', 'tweets/search/recent', config)
    return res.send(data)
  } catch (error) {
    console.log(error)
  }
})

router.get('/hashtag/:name/locations', async (req, res) => {
  try {
    console.log('GET /tweet/hashtag/:name/locations')
    const joiSchema = Joi.object().keys({ name: Joi.string().required() })
    const { value, error } = joiSchema.validate(req.params)

    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['hashtag'] })
    }

    const config = {
      params: {
        query: `#${value.name}`,
        'tweet.fields': 'geo'
      }
    }
    const { data } = await clientTwitterV2('get', 'tweets/search/recent', config)
    const postsLocationsId = data.data.filter(x => x.geo)

    const locations = []

    for (let location of postsLocationsId) {
      const coordenates = await new Promise((resolve, reject) => {
        clientStandardTwitter('get',`geo/id/${location.geo.place_id}`, {}, (error, tweets) => {
          if (tweets && !error) resolve(tweets)
          else reject(error)
        })
      })
      locations.push({
        text: location.text,
        cordenates: {
          name: coordenates.full_name,
          coords: coordenates.centroid
        }
      })
    }
    
    console.log(locations)
    return res.send(locations)

  } catch (error) {
    console.log(error)
  }
})
export default router