import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import { Strategy as twitterStrategy } from 'passport-twitter'
dotenv.config()

passport.use(new twitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK
}, (token, tokenSecret, profile, done) => {
  done(null, profile)
}))

// Routes
import auth from './routes/auth/routes.js'
import tweet from './routes/tweet/routes.js'

console.log(`[${new Date().toLocaleString('pt-br')} Starting Tweet Tracker]`)
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({secret: 'tweet-tracker-backend', resave: true, saveUninitialized: true}))


//routes
const router = express.Router()
router.use('/auth', auth)
router.use('/tweet', tweet)


app.use('/', router)
app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}`))