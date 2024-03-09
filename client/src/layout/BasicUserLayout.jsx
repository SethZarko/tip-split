import { Outlet, Navigate, Link } from 'react-router-dom'
import ProImage from "../assets/crown.png";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { useAppContext } from '../context/AppProvider'


export const BasicUserLayout = () => {
    const { token } = useAppContext()

    return (
        <main>
            <div className="nav-container">
                <nav>
                    <Link to='/register'>Go Pro! / Login<LazyLoadImage src={ProImage}/></Link>
                </nav>
            </div>
         
            <div className="logo-container">
                <h1 className='logo'>SPLI-<br/>-TTER</h1>
            </div>
            {!token ? <Outlet/> : <Navigate to='/pro/home'/>}    
        </main>
    )
}