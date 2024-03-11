import mongoose from 'mongoose'

// Validate and convert _id to ObjectId
export const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}