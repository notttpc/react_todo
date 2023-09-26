import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Auth.css'
import '../../components/Navigation.css'


export default function Profile() {
    const { currentUser } = useAuth()

  return (
    <span className='profile nav-sub'>
        Hello {!currentUser.displayName ? currentUser.email : currentUser.displayName.split(' ')[0]}!
        <img src={currentUser.photoURL} alt='Github user' />
    </span>
  )
}
