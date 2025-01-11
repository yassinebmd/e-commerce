import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/home.jsx'
import ResponsiveAppBar from './components/navbar.jsx'
import {Register} from './pages/register.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
