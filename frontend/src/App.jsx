import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Homepage} from './pages/home.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Homepage/>}/>
          </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
