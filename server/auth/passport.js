import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt'

// Database Model
import Admin from '../models/adminModel.js'

// Passport Auth - Cookie Session Strategy
export const initializePassport = (passport) => {
    passport.use('local', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
            try {   
                // Find User in Database - username = user input
                let user = await Admin.findOne({ email: email })
    
                // If user not in database, return error to user
                if (!user) {
                    return done(null, false, { message: 'Email Not Registered'})
                }
    
                // Search Database for hashed password and compare against inputted password
                let isMatch = await bcrypt.compare(password, user.password)
    
                // If User inputted password doesn't match, return error to user
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect Password' })
                }
    
                // If user exists, and the password matches, return user object
                return done(null, user)

            } catch (error) {
                return done(error)
            }
        },
    ))

    // Serialize User Information and Put in Cookie
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })

    // Deserialize User Information and attach to req.user object for other middleware
    passport.deserializeUser(async (id, done) => {
        try {
          const user = await Admin.findById(id);

          if(user) {
            return done(null, {id: user.id, email: user.email});
          } else {
            return done(new Error('No user with this id exists'))
          }
        } catch (err) {
          return done(err);
        }
      });
}