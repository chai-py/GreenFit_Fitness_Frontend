import React from 'react'
import Home from './pages/Home'
import { Route, Routes} from "react-router-dom"
import Trainings from './pages/Trainings'

function App() {
  return (
  <>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/Training" element={<Trainings />} />
  </Routes>
  </>
  )
}

export default App
