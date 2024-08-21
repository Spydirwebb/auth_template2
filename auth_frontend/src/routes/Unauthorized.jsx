import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div>
        <h1>Oops!</h1>
        <h2>You need to be logged in to view this page</h2>
        <Link to="/login">Login Page</Link>
    </div>
  )
}

export default Unauthorized