import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './Home.jsx'
import Lp from './Lp'

function App() {
  

  return (
    <>   
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Lp />} />
      </Routes>
    </>
  )
}

export default App
