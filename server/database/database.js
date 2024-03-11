import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

const mongoURI = process.env.MONGO_URI

export const connectDatabase = async () => {
    try {
        if (!mongoURI) {
            throw new Error('MONGO_URI environment variable is missing');
        }

        await mongoose.connect(mongoURI)
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}