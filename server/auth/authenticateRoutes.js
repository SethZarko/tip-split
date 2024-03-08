// Database Model
import Admin from '../models/adminModel.js'

export const authenticateLoggedInAdmin = (req, res, next) => {

    if(!req.isAuthenticated()){
        return res.status(403).json({
            timeStamp: Date.now(),
            message: 'Access Denied',
            code: 403
        })
    }

    return next()
}

// export const authenticateAdmin = async (req, res, next) => {
//     if(req.isAuthenticated()) {
//         const emailQuery = req.user.email
//         const adminUser = await User.findOne({ email: emailQuery });

//        if(adminUser && adminUser.admin === true) {
//         return next()
//        }
//     }

//     res.status(403).json({ message: 'You do not have access to this page'})
// }