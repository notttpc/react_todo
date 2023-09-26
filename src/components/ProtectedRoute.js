import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

//Below we are making a component that redirects the unauthenticated user to the login screen. We pass in children in the params as a prop which refers to any component that is nested inside of ProtectedRoute tags.
export default function ProtectedRoute({children}) {
const { currentUser } = useAuth()

  // Below we check to see if there's a curretUser. If so, render the children. Otherwise,
  // Navigate the user to the login view. We write this in a one-line return.
  return currentUser ? children : <Navigate to='/login' />
}

// After writing this component we implement in in App.js