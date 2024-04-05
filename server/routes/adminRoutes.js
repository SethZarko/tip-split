import { Router } from 'express'

const router = Router()

// Route Validation
import { protectRoute } from '../middleware/protectRoutes.js';
import { loginValidation, adminCreateValidation } from '../validation/routeValidation.js'

// Controller Imports
import { 
    adminLoginController, 
    adminCreateController,
    adminGetAllController,
    adminUpdateController,
    adminDeleteController
} from '../controllers/adminLoginController.js'

// ---- CRUD ROUTES ---- //

// POST /api/admin/create
router.post('/create', adminCreateValidation, adminCreateController)

// GET /api/admin/all
router.get('/all', protectRoute, adminGetAllController)

// PUT /api/admin/:id
router.put('/:id', protectRoute, adminUpdateController)

// DELETE /api/admin/:id
router.delete('/:id', protectRoute, adminDeleteController)


// ---- AUTH ROUTES ---- //

// POST /api/admin/auth/login
router.post('/auth/login', loginValidation, adminLoginController)


export default router