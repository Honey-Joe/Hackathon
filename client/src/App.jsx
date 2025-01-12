import React from 'react'
import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom'
import Home from './pages/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Team from './pages/Team'

const App = () => {
  const auth = !!localStorage.getItem("token");
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/admin/member' element={<Admin></Admin>} />
            <Route path='/member/:userId' element={<Team></Team>} />
            <Route path='/profile' element={auth?<Profile></Profile>:<Navigate to={"/"}></Navigate>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
