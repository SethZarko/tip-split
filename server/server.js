import 'dotenv/config'

// Imports
import express, { urlencoded } from 'express'
import cors from 'cors'

// Utility Functions
import { corsOptions } from './utilities/corsOptions.js'
import { connectDatabase } from './database/database.js'
import { errorHandler } from './middleware/errorHandler.js' 

// Initialize Express
const app = express()
const PORT = process.env.PORT || 8000

// Route Imports
import adminAuthRoutes from './routes/adminRoutes.js'
import calculatorRoutes from './routes/calculatorRoutes.js'


// Initialize Database
connectDatabase()


// Global Middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(urlencoded({ extended: false }))


// Routes
app.use('/api/admin/', adminAuthRoutes)
app.use('/api/calc/', calculatorRoutes)


// Error Handling Middleware
app.use(errorHandler)

// Run Server
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}...`)
})