import * as dotenv from 'dotenv'
dotenv.config()

// Imports
import express, { urlencoded } from 'express'
import cors from 'cors'
import passport from 'passport'
import cookieSession from 'cookie-session'

// Utility Functions
import { corsOptions } from './utilities/corsOptions.js'
import { connectDatabase } from './database/database.js'
import { errorHandler } from './middleware/errorHandler.js' 
import { initializePassport } from './auth/passport.js'

// Initialize Express
const app = express()
const PORT = process.env.PORT || 8000

// Route Imports
import adminAuthRoutes from './routes/adminRoutes.js'
import calculatorRoutes from './routes/calculatorRoutes.js'


// Initialize Database
connectDatabase()


// Intialize Passport
initializePassport(passport)


// Global Middleware
app.use(cookieSession({
    name: "app-auth",
    keys: [process.env.SECRET_KEY_ONE, process.env.SECRET_KEY_TWO],
    httpOnly: true,
    maxAge: 3600000
}))
// app.use(cookieParser)
app.use(express.json())
app.use(cors(corsOptions))
app.use(urlencoded({ extended: false }))



// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.use('/api/admin/', adminAuthRoutes)
app.use('/api/calc/', calculatorRoutes)


// Error Handling Middleware
app.use(errorHandler)

// Run Server
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}...`)
})