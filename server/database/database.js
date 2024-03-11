import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

const mongoURI = process.env.MONGO_URI

export const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error')
    }
}