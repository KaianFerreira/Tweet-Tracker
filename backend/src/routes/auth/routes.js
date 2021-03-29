import express from 'express'
import dotenv from 'dotenv'
import { clientTwitterV2, decodeClientTokens } from '../config/twitter-api'
import passport from 'passport'
dotenv.config()
const router = express.Router()

// login the user with twitter account
router.get('/twitter', passport.authenticate('twitter'), async (req, res) => {
  try {
    console.log('GET /auth/twitter')
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

// GET data about logged user
router.get('/user', async (req, res) => {
  try {
    console.log('GET /auth/user')
    const userTokens = JSON.parse(req.headers.twitterauth)
    const userIdentifications = await decodeClientTokens(userTokens.oauth_token, userTokens.oauth_verifier)
    const user = await clientTwitterV2('get', `users/${userIdentifications.user_id}`, null)
    return res.send({
      user:  user.data,
      userIdentifications
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

export default router