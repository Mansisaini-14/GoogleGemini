import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import db from './database.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const stmt = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
    const result = stmt.run(username, passwordHash)
    
    res.status(201).json({ 
      id: result.lastInsertRowid, 
      username,
      message: 'User registered successfully' 
    })
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({ error: 'Username already exists' })
    } else {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  }
})

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    res.json({ 
      id: user.id, 
      username: user.username,
      message: 'Login successful' 
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`)
})
