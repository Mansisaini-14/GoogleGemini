import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Auth from './components/Auth/Auth'
import { Context } from './context/Context'

const App = () => {
  const { user, loading } = useContext(Context)

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Auth mode="login" /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!user ? <Auth mode="register" /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={
            user ? (
              <div style={{ display: 'flex', height: '100vh' ,width: '100vw'}}>
                <Sidebar />
                <Main />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
