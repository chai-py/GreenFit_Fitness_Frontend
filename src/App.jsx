import React from 'react'
import Home from './pages/Home'
import { Route, Routes} from "react-router-dom"
import Trainings from './pages/Trainings'
import SignUp from './components/SignUp'

function App() {
  return (
  <>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/Training" element={<Trainings />} />
  <Route path="/SignUp" element={<SignUp />} />
  </Routes>
  </>
  )
}

export default App
