import React from 'react'
import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom'
import Home from './pages/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Team from './pages/Team'
import AdminTeam from './pages/AdminTeam'

const App = () => {
  const auth = localStorage.getItem("token");
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/admin' element={auth?<Admin></Admin>:<Navigate to={"/"}></Navigate>}></Route>
            <Route path='/profile/team' element={<Team></Team>} />
            <Route path='/admin/:id' element={<AdminTeam></AdminTeam>} />
            <Route path='/profile' element={auth?<Profile></Profile>:<Navigate to={"/"}></Navigate>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
