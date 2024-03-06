// Imports
import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'

// Create Context
const AppContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
})

// Context Provider
export const AppProvider = ({ children }) => {

    // Context State
    const [user, setUser] = useState([])
    const [token, _setToken ] = useState(localStorage.getItem('ACCESS_TOKEN'))

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
        setUser,
        setToken,
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