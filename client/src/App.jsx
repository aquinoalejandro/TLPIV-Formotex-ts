import React from 'react'
import {Login} from './pages/login'
import {Register} from './pages/register'
import {MainPage} from './pages/mainPage'


import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainPage" element={< MainPage/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
