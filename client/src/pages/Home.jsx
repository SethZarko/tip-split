import { useAppContext } from "../context/AppProvider"        

// Components
import { Bill } from '../components/Bill.jsx'

export const Home = () => {
    const { token } = useAppContext()

    return (
        <section id='home'>
            {token ? ( 
                <>
                
                </>
            ) : (
                <>
                    <Bill/>
                </>
            )}
        </section>
    )
}