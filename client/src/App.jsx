import React from 'react'
import {Login} from './pages/login'
import {Register} from './pages/register'
import {MainPage} from './pages/mainPage'
import {Clientes} from './pages/clientes'
import {Ventas} from './pages/ventas'
import {ProtectedRoute} from './components/ProtectedRoutes'


import {BrowserRouter, Routes, Route} from 'react-router-dom'



function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainPage" element={<ProtectedRoute>< MainPage/></ProtectedRoute>} />
          <Route path="/clientes" element={<ProtectedRoute>< Clientes/></ProtectedRoute>} />
          <Route path="/ventas" element={<ProtectedRoute>< Ventas/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
