import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import {AuthProvider} from './hooks/AuthProvider'
import Root from './routes/Root'
import Home from './routes/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import ErrorPage from './errorPage'
import Index from './index'
import Study from './routes/Study'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import Unauthorized from './routes/Unauthorized'
import Testing from './routes/Testing'


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
        element: <Testing />
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)