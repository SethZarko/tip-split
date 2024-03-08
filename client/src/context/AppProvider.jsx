// Imports
import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'

// Create Context
const AppContext = createContext({
    user: null,
    token: null,
    billFormData: null,
    tipFormData: null,
    setUser: () => {},
    _setToken: () => {},
    setBillFormData: () => {},
    setTipFormData: () => {},
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

    // Context Methods
    const setToken = (token) => {
        _setToken(token)

        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }


    // Context Object
    const contextValue = {
        user,
        token,
        billFormData,
        tipFormData,
        setUser,
        setToken,
        setBillFormData,
        setTipFormData
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