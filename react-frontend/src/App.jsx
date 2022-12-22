import { useState } from 'react'
import { Link, BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route path='/' exact element={<Dashboard />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App