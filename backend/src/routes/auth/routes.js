import express from 'express'
import dotenv from 'dotenv'
import { test } from '../config/twitter-api'
import passport from 'passport'
dotenv.config()
const router = express.Router()

router.get('/test', async (req, res) => {
  try {
    console.log('GET /auth/test')
    return res.send(await test())
  } catch (error) {
    return res.status(400).send({ error: 'Internal error'})
  }
})

router.get('/twitter', passport.authenticate('twitter'), async (req, res) => {
  try {
    console.log('GET /auth/twitter')
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

export default router