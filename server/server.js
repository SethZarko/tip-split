import 'dotenv/config'

// Imports
import express, { urlencoded } from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url';
import path from 'path';

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

// Variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Database
connectDatabase()


// Global Middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'client/dist')));


// Routes
app.use('/api/admin/', adminAuthRoutes)
app.use('/api/calc/', calculatorRoutes)

// Catch-all route to serve the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});


// Error Handling Middleware
app.use(errorHandler)

// Run Server
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}...`)
})