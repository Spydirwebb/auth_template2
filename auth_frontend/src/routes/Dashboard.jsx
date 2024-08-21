import React from 'react'
import { useAuth } from '../hooks/AuthProvider'

const Dashboard = () => {
  const auth = useAuth()

  return (
    <div>
      <h1>Welcome {auth.user.name}</h1>
      <button onClick={()=> auth.logoutAction()}>Logout</button>
    </div>
  )
}

export default Dashboard