import mongoose, { Schema } from "mongoose"
import { hashPassword} from '../utilities/hashPassword.js'


const adminSchmea = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Apply the hashPassword function as a pre-save hook
adminSchmea.pre('save', hashPassword);
adminSchmea.pre('updateOne', hashPassword);


// ---- Mongoose Statics ---- //

//Save User to Database
adminSchmea.statics.createAdmin = async function(email, password) {
    try {
        
        // Input Check
         if(!email || !password) {
            throw Error('All Fields Required')
        }

        // Existing User Check
        const exists = await this.findOne({ email })

        if (exists) {
            throw Error('Email already in use')
        }

        // Create and Save New User
        const query = {
            email: email,
            password: password
        }

        const user = new this(query)
        await user.save()
        return user

    } catch (error) {
      throw Error(error)
    }
};

// Get All Users From Database
adminSchmea.statics.findAllAdmin = async function(req, res) {

    try {

        if(req.user.id === null){
            res.status(400)
            throw Error('Please Provide Valid Credentials')
        }

        const users = await this.find({ _id: req.user.id }).select('-password')

        // Users Check
        if(users.length === 0) {
            return []
        } 

        return users

    } catch (error) {
        throw Error(error)
    }
}


// Update User In Database
adminSchmea.statics.updateAdmin = async function(req, email, password) {

    try {

        const user = await this.findById({ _id: req.user.id });

        // User Check
        if (!user) {
            throw Error('User Does Not Exist');
        }

        const query = {
            email: email,
            password: password
        }

        // Update User Data
        const updated = await user.set(query);
        await this.updateOne(updated);

        return updated;

    } catch (error) {
        throw Error(error);
    }
}

// Delete User From Database
adminSchmea.statics.deleteAdmin = async function(req) {

    try {

        // Existing User Check
        const user = await this.findById({ _id: req.user.id });

        if(!user) {
            throw Error('User Does Not Exist')
        }

        await this.findByIdAndDelete(id)
        return 1

    } catch (error) {
        throw Error(error)
    }
}

const Admin = mongoose.model('Admin', adminSchmea)
export default Admin