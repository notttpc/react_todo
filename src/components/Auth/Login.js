import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()


  async function handleAuth() {
    await login()

    return navigate('/')
  }

  return (
    <div className="login background">
        <article className="bg-danger mb-5 p-5 text-dark">
            <h1 className="text-center Title">Welcome to React ToDO!</h1>
        </article>
        <Container className='p-5'>
            <Card className='m-2 border-danger text-center'>
                <Card.Header className='bg-danger text-dark'>
                    <h2 className='sub-title'>
                        Login in for full functionality
                    </h2>
                </Card.Header>
                <Card.Body>
                    <button className="btn btn-outline-dark" onClick={() => handleAuth()}>
                        Login w/ GitHub
                    </button>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}
