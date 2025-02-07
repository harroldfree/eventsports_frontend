
import './App.css'
import 'boxicons'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Reservation from './Pages/Reservation'
import Home from './Pages/Home'
import Product from './Pages/Product'
import { Toaster } from 'react-hot-toast'
import CreateEvent from './Pages/CreateEvent'
import Login from './Components/Login'
import Register from './Components/Register'
import LogOut from './Components/LogOut'
import ProtectedRoute from './Components/ProtectedRoute'
import axios from 'axios'
import ProtectedSection from './Components/ProtectedSection'
import EditEvent from './Components/CreateEvent/EditEvent'
import { useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'

function App() {
  // const [count, setCount] = useState(0)
  axios.defaults.withCredentials = true;
  const location = useLocation();

    // scroll to top of page after a page transition.
    useLayoutEffect(() => {
        document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
    }, [location.pathname]);
  

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/connexion' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/deconnexion' element={
          <ProtectedRoute>
            <LogOut />
          </ProtectedRoute>
          } />
        <Route path='/reservation/:productId' element={
          <ProtectedSection>
            <Reservation />
          </ProtectedSection>
          
          } />
        <Route path='/createevent' element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>

          } />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/editevent/:id' element={<EditEvent />} />
        <Route path="/product/:productId" element={<Product />} />

      </Routes>
      
      <Toaster  
        position='bottom-right'
        
       />
    </div>
  )
}

export default App
