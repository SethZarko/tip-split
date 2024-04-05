import { useEffect } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'

import axiosClientLogin from '../axiosClient.js' 

import { useAppContext } from '../context/AppProvider'

export const ProUserLayout = () => {
    const { token, user, setUser, successMessage } = useAppContext()

    useEffect(() => {
        if (token !== null) {
            axiosClientLogin.get('https://https://tip-split.onrender.com/api/admin/all')
            .then(({ data }) => {
                data.map((elem) => {
                    setUser(elem.email)
                })
            })
        }
    }, [token])

    return (
        <main>
            <div className="user-info-container">
                <h3>Logged in as: {user} </h3>

                <div className="user-info-btn-container">
                    <Link to='/pro/profile' className='btn-logout'>Profile</Link>
                </div>

              
            </div>
            
            <div className="logo-container">
                <h1 className='logo'>SPLI<br/>TTER</h1>
            </div>
            {successMessage && <p className='success-saved-calculation'>{successMessage}</p>}
            {token ? <Outlet/> : <Navigate to='/'/>}    
        </main>
    )
}