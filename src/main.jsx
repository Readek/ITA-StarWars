import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './assets/global.css'
import Root from './pages/root.jsx'
import ErrorPage from './error-page.jsx'
import Starships from './pages/starships.jsx'
import StarshipDetails, {loader as shipLoader} from './pages/starship-details.jsx'
import { SwapiProvider } from './contexts/SwapiContext.jsx'
import SignIn from './pages/signIn.jsx'
import SignUp from './pages/signUp.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Starships",
    element: <Starships/>,
  },
  {
    path: "/Starship-Details/:shipId",
    element: <StarshipDetails/>,
    loader: shipLoader
  },
  {
    path: "/SignUp",
    element: <SignUp/>,
  },
  {
    path: "/SignIn",
    element: <SignIn/>,
  }
], {
  basename: "/ITA-StarWars"
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SwapiProvider>
        <RouterProvider router={router}/>
      </SwapiProvider>
    </AuthProvider>
  </StrictMode>,
)
