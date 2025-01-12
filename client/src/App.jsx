import React from 'react'
import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom'
import Home from './pages/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
<<<<<<< HEAD
import Profile from './pages/Profile'
=======
import Admin from './pages/Admin'
import Team from './pages/Team'
>>>>>>> 2b2b91ee44c72cd149b4a6cafc63989b9449dcac

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
<<<<<<< HEAD
            <Route path='/profile' element={<Profile></Profile>}></Route>
=======
            <Route path='/admin/member' element={<Admin></Admin>} />
            <Route path='/member/:userId' element={<Team></Team>} />
>>>>>>> 2b2b91ee44c72cd149b4a6cafc63989b9449dcac
        </Routes>
      </Router>
    </div>
  )
}

export default App
