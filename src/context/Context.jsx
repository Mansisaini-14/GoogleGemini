import { createContext, useState, useEffect } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('thinkbot_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()
      if (response.ok) {
        setUser(data)
        localStorage.setItem('thinkbot_user', JSON.stringify(data))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        return true
      }
      return false
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('thinkbot_user')
  }

  const contextValue = {
    user,
    setUser,
    login,
    register,
    logout,
    loading
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider
