import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Homepage} from './pages/home.jsx'
import ResponsiveAppBar from './components/navbar.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
      <ResponsiveAppBar/>
          <Routes>
            <Route path='/home' element={<Homepage/>}/>
          </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
