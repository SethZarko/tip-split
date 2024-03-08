import passport from 'passport';

import Admin from '../models/adminModel.js'

// Utility Functions
import { validationResult } from 'express-validator';
import { isValidObjectId } from '../validation/isValidID.js';

// ---- ADMIN CRUD CONTROLLERS ---- //

// Admin Create Controller
export const adminCreateController = async (req, res) => {
    const { email, password } = req.body
    
    try {

        // Validation Error Check
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await Admin.createAdmin(email, password)
    
        return res.status(201).json(user.email)

      } catch (error) {
        
        return res.status(400).json({error: error.message})
    }
}

// Admin Get All Controller
export const adminGetAllController = async (req, res, next) => {
    try {
        const admin = await Admin.findAllAdmin()

        return res.status(200).json(admin)
    
    } catch (error) {
        next(error)
    }
} 

// Admin Update Controller
export const adminUpdateController = async (req, res, next) => {
    const { email, password } = req.body
    const { id } = req.params

    try {

        // Validation Error Check
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if ID in params
        if(!id) {
            return res.status(400).json({
                data: 'Please Provide and Id'
            })
        }

        // Check if ID is valid MongoID
        if(!isValidObjectId(id)) {
            return res.status(400).json({
                data: 'Invalid Id'
            })
        }

        req.logout()
        const updatedUser = await Admin.updateAdmin(id, email, password)
    
        return res.status(201).json({ 
            message: 'Admin Updated',
            user: updatedUser
        })

      } catch (error) {

        next(error)
    }
}

// Admin Delete Controller
export const adminDeleteController = async (req, res, next) => {
    const { id } = req.params

    try {

        // Check if ID in params
        if(!id) {
            return res.status(400).json({
                data: 'Please Provide and Id'
            })
        }

        // Check if ID is valid MongoID
        if(!isValidObjectId(id)) {
            return res.status(400).json({
                data: 'Invalid Id'
            })
        }

        req.logout()
        await Admin.deleteAdmin(id)
    
        return res.status(200).json({ message: 'Admin Deleted'})

      } catch (error) {

        next(error)
    }
}



// ---- ADMIN AUTH CONTROLLERS ---- //


// Admin Login Controller
export const adminLoginController = async (req, res, next) => {

    try {
        
        // Validation Error Check
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        passport.authenticate('local', (err, user) => {
            if(err) {
                return res.status(401).json({ 
                    timestamp: Date.now(),
                    message: 'Access Denied: Username or Password is incorrect',
                    code: 401
                }) 
            }

            if(!user){
                return res.status(401).json({
                    timestamp: Date.now(),
                    message: 'Unauthorized User',
                    code: 401
                })
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err)
                }

                return res.status(200).json({
                    timestamp: Date.now(),
                    message: 'User Logged in Successfully',
                    code: 200,
                    token: true,
                    user: user.email
                })
            })

        })(req, res, next)
    } catch (error) {

        next(error)
    }
}

// Admin Logout Controller
export const adminLogoutController = async (req, res) => {
    try {
        req.session = null

        res.setHeader('Set-Cookie', [`app-auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`])

        req.logout()
        
        res.clearCookie('app-auth', { path: '/', httpOnly: true })
   
        return res.status(200).json({
            timestamp: Date.now(),
            message: 'Logged Out Successfully',
            code: 200
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            timestamp: Date.now(),
            message: 'Failed to log out - internal server error',
            code: 500
        });
    }
}