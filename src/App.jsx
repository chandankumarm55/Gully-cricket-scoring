import React from 'react'
import TeamDetails from './pages/TeamDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Toss from './pages/Toss'
import './App.css'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <TeamDetails /> } />
          <Route path='/toss' element={ <Toss /> } />
          <Route path='/main' element={ <Main /> } />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
