import React from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/Home'
<h1 className="text-6xl text-white bg-blue-500 p-4">
  Tailwind Working
</h1>

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App