import { useEffect } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'

import axiosClientLogin from '../axiosClient.js' 

import { useAppContext } from '../context/AppProvider'


export const ProUserLayout = () => {
    const { token, user, setUser, setToken } = useAppContext()

    useEffect(() => {
        if (token !== null) {
            axiosClientLogin.get('http://localhost:8000/api/admin/all')
            .then(({ data }) => {
                data.map((elem) => {
                    setUser(elem.email)
                })
            })
        }
    }, [token])

    const onLogout = (e) => {
        e.preventDefault()

        axiosClientLogin.post('http://localhost:8000/api/admin/auth/logout')
            .then(() => {
                setUser([])
                setToken(null)
            })
    }

    return (
        <main>
            <div className="user-info-container">
                <h3>Logged in as: {user} </h3>

                <div className="user-info-btn-container">
                    <Link href="#" className='btn-logout'>Profile</Link>
                    <button href="#" onClick={onLogout} className='btn-logout'>Logout</button>
                </div>

              
            </div>
            
            <div className="logo-container">
                <h1 className='logo'>SPLI-<br/>-TTER</h1>
            </div>
            {token ? <Outlet/> : <Navigate to='/'/>}    
        </main>
    )
}