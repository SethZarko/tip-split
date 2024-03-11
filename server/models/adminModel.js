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


// ---- Mongoose Statics ---- //

//Save User to Database
adminSchmea.statics.createAdmin = async function(email, password) {
    try {

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
adminSchmea.statics.findAllAdmin = async function() {

    try {
        const users = await this.find({})

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
adminSchmea.statics.updateAdmin = async function(id, email, password) {

    try {

        const user = await this.findById(id);

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
        await updated.save();

        return updated;

    } catch (error) {
        throw Error(error);
    }
}

// Delete User From Database
adminSchmea.statics.deleteAdmin = async function(id) {

    try {

        // Existing User Check
        const user = await this.findById(id);

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