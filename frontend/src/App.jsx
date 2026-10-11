import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Clients from './pages/Clients/Clients'
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
