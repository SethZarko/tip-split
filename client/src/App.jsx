// React Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

// Context Wrapper Import
import { AppProvider } from './context/AppProvider.jsx'

// Layouts
import { ProUserLayout } from './layout/ProUserLayout.jsx'
import { BasicUserLayout } from './layout/BasicUserLayout.jsx'
import { Home } from './pages/Home.jsx'

// ProUser Pages
import { UserProfile } from './pages/UserProfile.jsx'

// BasicUser Pages
import { Login } from './pages/Login.jsx'

// Components
import { NotFound } from './components/NotFound.jsx'

// Loader Imports

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<BasicUserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Route>

      <Route path='/pro' element={<ProUserLayout/>}>
        <Route path='home' element={<Home/>}/>
        <Route path='profile' element={<UserProfile/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Route>
    </>
  )
)

function App() {

  return (
    <>
      <AppProvider>
        <RouterProvider router={router}/>
      </AppProvider>
    </>
  )
}

export default App