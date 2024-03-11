import { Router } from 'express'

const router = Router()

// Route Validation
import { authenticateLoggedInAdmin } from '../auth/authenticateRoutes.js'
import { calcValidation } from '../validation/routeValidation.js'

// Controller Imports
import {
    calcCreateController,
    calcGetAllController,
    calcDeleteController
} from '../controllers/calcControllers.js'


// ---- CRUD ROUTES ---- //

// POST /api/calc/create
router.post('/create', calcValidation, authenticateLoggedInAdmin, calcCreateController)

// GET /api/calc/all
router.get('/all', authenticateLoggedInAdmin, calcGetAllController)

// DELETE /api/calc/:id
router.delete('/:id', authenticateLoggedInAdmin, calcDeleteController)


export default router