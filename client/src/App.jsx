import React from 'react'
import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom'
import Home from './pages/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Team from './pages/Team'
import AdminTeam from './pages/AdminTeam'
import ScrollToTop from './components/ScrollTop'

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
            <Route path='/' element={<Home></Home>}></Route> 
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/admin' element={<Admin></Admin>}></Route>
            <Route path='/profile/team' element={<Team></Team>} />
            <Route path='/admin/:id' element={<AdminTeam></AdminTeam>} />
            <Route path='/profile' element={<Profile></Profile>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
