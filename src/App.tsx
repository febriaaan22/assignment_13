// import { useState } from 'react'
import './App.css'
import LoginForm from './Containers/LoginForm'
import RegisterForm from './Containers/RegisterForm'
import Dashboard from './Containers/Dashboard'
// import AddForm  from './Containers/AddForm'
// import EditForm from './Containers/EditForm'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route path='/' element={<LoginForm/>} />
    <Route path='/register' element={<RegisterForm/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App