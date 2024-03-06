import { Outlet, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppProvider'


export const BasicUserLayout = () => {
    const { token } = useAppContext()

    return (
        <main>
            {!token ? <Outlet/> : <Navigate to='/pro/home'/>}    
        </main>
    )
}