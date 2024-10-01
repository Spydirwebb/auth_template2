import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import {AuthProvider} from './hooks/AuthProvider'
import Home from './routes/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import ErrorPage from './errorPage'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import Unauthorized from './routes/Unauthorized'
//import Testing, { loader as remindersLoader } from './routes/Testing'
import Testing from './routes/Testing'
import makeServer from "./server"



const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/unauthorized",
        element: <Unauthorized />
      },
      {
        path: "/testing",
        element: <Testing />,
      },
      {
        path: "/login",
        element: <AuthProvider><Login /></AuthProvider>,
      },
      {
        path: "/",
        element: <AuthProvider><ProtectedRoute/></AuthProvider>,
        children:[
          {
            path: "/dashboard",
            element: <Dashboard />
          }
        ]
      }
    ]
  },
]) 

export default function App () {
  makeServer()
  return(
      <RouterProvider router={router} />
  )
}