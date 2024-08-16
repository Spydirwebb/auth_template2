import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import AuthProvider from './hooks/AuthProvider'
import Root from './routes/Root'
import Home from './routes/Home'
import ErrorPage from './errorPage'
import Index from './index'
import Study from './routes/Study'
import Login from './routes/Login'


const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {path: "/login",
        element: <Login />
      }
    ]
  },
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)