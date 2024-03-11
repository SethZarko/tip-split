import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppProvider'

export const NotFound = () => {

    const { token } = useAppContext()

    return (
        <section id='notFound'>
              <h1>Not Found</h1>
              {token ? (
                <>
                    <Link to='/pro/home'>Return</Link>
                </>
              ): (
                <>
                    <Link to='/'>Return</Link>
                </>
              )}
  
        </section>
    )
}