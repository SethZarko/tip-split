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

// ProUser Pages

// Guest Pages

// Components

// Loader Imports

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/basic' element={<BasicUserLayout/>}>

      </Route>

      <Route path='/pro' element={<ProUserLayout/>}>

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