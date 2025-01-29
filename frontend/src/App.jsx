import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/home.jsx'
import ResponsiveAppBar from './components/navbar.jsx'
import { Register } from './pages/register.jsx'
import { AuthProvider } from './context/auth/authProvider'
import { Login } from './pages/login.jsx'
import { Cart } from './pages/cart.jsx'
import { ProtectedRoute } from './components/protectedroute.jsx'
import CartProvider from './context/Cart/cartProvider.jsx'
import { Checkout } from './pages/checkout.jsx'
import  SuccessPage  from './pages/succese.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/Cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/Succece' element={<SuccessPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App