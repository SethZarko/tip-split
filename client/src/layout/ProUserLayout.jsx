import { Outlet, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppProvider'


export const ProUserLayout = () => {
    const { token } = useAppContext()

    return (
        <main>
            <h1 className='logo'>SPLITTER</h1>
            {token ? <Outlet/> : <Navigate to='/'/>}    
        </main>
    )
}