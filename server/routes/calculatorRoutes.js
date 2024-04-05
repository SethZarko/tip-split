import { Router } from 'express'

const router = Router()

// Route Validation
import { protectRoute } from '../middleware/protectRoutes.js';
import { calcValidation } from '../validation/routeValidation.js'

// Controller Imports
import {
    calcCreateController,
    calcGetAllController,
    calcDeleteController
} from '../controllers/calcControllers.js'


// ---- CRUD ROUTES ---- //

// POST /api/calc/create
router.post('/create', calcValidation, protectRoute, calcCreateController)

// GET /api/calc/all
router.get('/all', protectRoute, calcGetAllController)

// DELETE /api/calc/:id
router.delete('/:id', protectRoute, calcDeleteController)


export default router