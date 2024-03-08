import { Router } from 'express'

const router = Router()

// Route Validation
import { authenticateLoggedInAdmin } from '../auth/authenticateRoutes.js'
import { loginValidation, adminCreateValidation } from '../validation/routeValidation.js'

// Controller Imports
import { 
    adminLoginController, 
    adminLogoutController, 
    adminCreateController,
    adminGetAllController,
    adminUpdateController,
    adminDeleteController
} from '../controllers/adminLoginController.js'

// ---- CRUD ROUTES ---- //

// POST /api/admin/create
router.post('/create', adminCreateValidation, adminCreateController)

// GET /api/admin/all
router.get('/all', authenticateLoggedInAdmin, adminGetAllController)

// PUT /api/admin/:id
router.put('/:id', authenticateLoggedInAdmin, adminUpdateController)

// DELETE /api/admin/:id
router.delete('/:id', authenticateLoggedInAdmin, adminDeleteController)


// ---- AUTH ROUTES ---- //

// POST /api/admin/auth/login
router.post('/auth/login', loginValidation, adminLoginController)

// POST /api/auth/admin/logout
router.post('/auth/logout', authenticateLoggedInAdmin, adminLogoutController)

export default router