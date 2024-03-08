import mongoose, { Schema } from "mongoose"


const calculatorSchmea = new Schema({
    subBill: {
        type: String,
        required: true
    },
    gratuity: {
        type: Boolean
    },
    tipPercent: {
        type: String,
        required: true
    },
    tip: {
        type: String,
        required: true
    },
    numberOfPeople: {
        type: String,
        required: true
    },
    totalTipPerPerson: {
        type: String,
        required: true
    },
    HST: {
        type: String,
        required: true
    },
    totalBillPerPerson: {
        type: String,
        required: true
    },
    totalBill: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


// ---- Mongoose Statics ---- //

//Save to Database
calculatorSchmea.statics.createCalculation = async function(subBill, gratuity, tipPercent, tip, numberOfPeople, totalTipPerPerson, HST, totalBillPerPerson, totalBill) {
    try {

        // Create and Save New User
        const query = {
            subBill, 
            gratuity, 
            tipPercent, 
            tip, 
            numberOfPeople,
            totalTipPerPerson, 
            HST, 
            totalBillPerPerson, 
            totalBill
        }

        const calculation = new this(query)
        await calculation.save()
        return calculation

    } catch (error) {
      throw Error(error)
    }
};

// Get All From Database
calculatorSchmea.statics.findAllCalculations = async function() {

    try {
        const calculations = await this.find({})

        // Existing Check
        if(calculations.length === 0) {
            return []
        } 

        return calculations

    } catch (error) {
        throw Error(error)
    }
}


// Delete From Database
calculatorSchmea.statics.deleteCalculation = async function(id) {

    try {

        // Existing User Check
        const calculation = await this.findById(id);

        if(!calculation) {
            throw Error('This Entry Does Not Exist')
        }

        await this.findByIdAndDelete(id)
        return 1

    } catch (error) {
        throw Error(error)
    }
}

const Calculator = mongoose.model('Calculator', calculatorSchmea)
export default Calculator