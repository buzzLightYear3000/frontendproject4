import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import * as authService from '../../services/authService'
import './SigninForm.scss'

const SigninForm = ({ setUser }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    hashedPassword: '',
  })

  const updateMessage = (message) => {
    setMessage(message)
  }

  const handleChange = (event) => {
    updateMessage('')
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await authService.signin(formData)
      setUser(user)
      navigate('/')
    } catch (error) {
      updateMessage(error.message)
    }
  }

  return (
    <Container className="signin-form">
      <h1>Log In</h1>
      {message && <Alert variant="danger">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="hashedPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="hashedPassword"
            value={formData.hashedPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="btn-container">
          <Button variant="primary" type="submit">
            Log In
          </Button>
          <Link to="/">
            <Button variant="secondary">Go Back</Button>
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default SigninForm
