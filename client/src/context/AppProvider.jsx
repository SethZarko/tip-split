// Imports
import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'

// Create Context
const AppContext = createContext({
    user: null,
    token: null,
    billFormData: null,
    tipFormData: null,
    peopleFormData: null,
    setUser: () => {},
    _setToken: () => {},
    setBillFormData: () => {},
    setTipFormData: () => {},
    setPeopleFormData: () => {},
})

// Context Provider
export const AppProvider = ({ children }) => {

    // Context State
    const [user, setUser] = useState([])
    // const [token, _setToken ] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [token, _setToken ] = useState(false)
    console.log('User Token:', token);

    const [billFormData, setBillFormData] = useState({ bill: '' })
    const [tipFormData, setTipFormData] = useState(0)
    const [peopleFormData, setPeopleFormData] = useState({ people: ''})

    // Context Methods
    const setToken = (token) => {
        _setToken(token)

        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const cleanNumberInput = (numberString) => {
        // Remove any existing commas from the input
        numberString = numberString.replace(/,/g, '');
    
        // Remove any non-numeric characters except the decimal point
        numberString = numberString.replace(/[^\d.]+/g, '');
    
        // Ensure that the number is not negative
        if (parseFloat(numberString) < 0) {
          numberString = '';
        }
    
        // Split the number into integer and decimal parts
        const parts = numberString.split('.');
        let integerPart = parts[0];
        let decimalPart = parts[1] || '';
    
        // Remove any extra decimal points after the first one
        decimalPart = decimalPart.replace(/\./g, '');
    
        // Add commas to the integer part
        let formattedInteger = '';
        for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
          if (j % 3 === 0 && j !== 0) {
            formattedInteger = ',' + formattedInteger;
          }
          formattedInteger = integerPart.charAt(i) + formattedInteger;
        }
    
        // Combine the integer and decimal parts
        let formattedNumber = formattedInteger;
        if (decimalPart) {
          formattedNumber += '.' + decimalPart;
        }
    
        return formattedNumber;
      };


    // Context Object
    const contextValue = {
        user,
        token,
        billFormData,
        tipFormData,
        peopleFormData,
        setUser,
        setToken,
        setBillFormData,
        setTipFormData,
        setPeopleFormData,
        cleanNumberInput
    }

    // Return Context
    return (
        <AppContext.Provider value={contextValue}>
            { children }
        </AppContext.Provider>
    )
}

// Export Context
export const useAppContext = () => {
    return useContext(AppContext)
}

// Prop Validation
AppProvider.propTypes = {
    children: PropTypes.node,
}