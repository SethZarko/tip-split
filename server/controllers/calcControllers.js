import Calculator from '../models/calculatorModel.js'

// Utility Functions
import { validationResult } from 'express-validator';
import { isValidObjectId } from '../validation/isValidID.js'

// ---- CONTACT CRUD CONTROLLERS ---- //

// contact Create Controller
export const calcCreateController = async (req, res, next) => {
    const { bill, gratuity, tip, numberOfPeople, totalTipPerPerson, hst, totalBillPerPerson, totalBill } = req.body

    
    
    try {

        // Validation Error Check
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const calculator = await Calculator.createCalculation(bill, gratuity, tip, numberOfPeople, totalTipPerPerson, hst, totalBillPerPerson, totalBill)
    
        return res.status(201).json(calculator)

      } catch (error) {
        
        next(error)
    }
}

// contact Get All Controller
export const calcGetAllController = async (req, res, next) => {
    try {
        const calculations = await Calculator.findAllCalculations()

        return res.status(200).json(calculations)
    
    } catch (error) {
        next(error)
    }
} 

// contact Delete Controller
export const calcDeleteController = async (req, res, next) => {
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

        await Calculator.deleteCalculation(id)
    
        return res.status(200).json({ message: 'Saved Calculation Deleted'})

      } catch (error) {

        next(error)
    }
}