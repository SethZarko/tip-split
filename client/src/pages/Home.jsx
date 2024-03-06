import { useAppContext } from "../context/AppProvider"        

// Components

export const Home = () => {
    const { token } = useAppContext()

    return (
        <section id='home'>
            {token ? ( 
                <>
                
                </>
            ) : (
                <>
                
                </>
            )}
        </section>
    )
}