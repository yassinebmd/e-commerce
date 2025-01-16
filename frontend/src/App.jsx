import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/home.jsx'
import ResponsiveAppBar from './components/navbar.jsx'
import { Register } from './pages/register.jsx'
import { AuthProvider } from './context/auth/authProvider'
import { Login } from './pages/login.jsx'
function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App
