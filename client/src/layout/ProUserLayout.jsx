import { Outlet, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppProvider'


export const ProUserLayout = () => {
    const { token } = useAppContext()

    return (
        <main>
            <div className="logo-container">
                <h1 className='logo'>SPLI<br/>TTER</h1>
            </div>
            {token ? <Outlet/> : <Navigate to='/'/>}    
        </main>
    )
}