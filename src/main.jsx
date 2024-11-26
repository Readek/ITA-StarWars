import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './assets/global.css'
import Root from './pages/root.jsx'
import ErrorPage from './error-page.jsx'
import Starships from './pages/starships.jsx'
import StarshipDetails, {loader as shipLoader} from './pages/starship-details.jsx'
import { SwapiContext } from './context/SwapiContext.jsx'

// we create a custom route provider just so we can have a global context
const CustomRouterProvider = () => {

  const [shipsData, setShipsData] = useState([]);

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

  return (
    <SwapiContext.Provider value={
      {shipsData: shipsData, setShipsData: setShipsData}
    }>
      <RouterProvider router={router}/>
    </SwapiContext.Provider>
  )

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomRouterProvider/>
  </StrictMode>,
)
