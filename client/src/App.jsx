import React from 'react'
import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
