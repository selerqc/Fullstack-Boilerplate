import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';
import { apilimiterMiddleware } from './middleware/apilimiter.js'
import notFound from './middleware/notFound.js'
import initializePassport from './auth/passportAuth.js';
import initializeGooglePassport from "./strategy/googleStrategy.js"
import connectDb from "./config/database.js"
import Route from './routes/index.js'


const app = express();

connectDb()

initializePassport.initializePassport(passport)
initializePassport.initializeJwtPassport(passport)
initializeGooglePassport.initializeGooglePassport(passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));


app.use(helmet())
app.use(morgan('dev'));
app.use(apilimiterMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
}));


app.use('/api', Route);
app.get('/favicon.ico', (req, res) => { res.status(204).end(); });

app.use(notFound)




export default app