import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './assets/global.css'
import Root from './pages/root.jsx'
import ErrorPage from './error-page.jsx'
import Starships from './pages/starships.jsx'
import StarshipDetails, {loader as shipLoader} from './pages/starship-details.jsx'
import { SwapiProvider } from './context/SwapiContext.jsx'

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
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SwapiProvider>
      <RouterProvider router={router}/>
    </SwapiProvider>
  </StrictMode>,
)
