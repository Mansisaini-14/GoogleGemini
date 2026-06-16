import React, { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'
import { assets } from '../../assets/assets'

const Auth = ({ mode }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, register } = useContext(Context)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      if (mode === 'login') {
        const success = await login(username, password)
        if (success) navigate('/')
        else setError('Invalid username or password')
      } else {
        const success = await register(username, password)
        if (success) {
          alert('Registration successful! Please login.')
          navigate('/login')
        } else {
          setError('Username already exists or registration failed')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='auth-container'>
      <div className="auth-box">
        <div className="auth-header">
          <img src={assets.gemini_icon} alt="ThinkBot Logo" />
          <h1>{mode === 'login' ? 'Sign In' : 'Sign Up'}</h1>
          <p>to continue to ThinkBot</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-footer">
          {mode === 'login' ? (
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
