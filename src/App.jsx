
import './App.css'
import 'boxicons'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Contact from './Pages/Contact'
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

function App() {
  // const [count, setCount] = useState(0)
  axios.defaults.withCredentials = true;

  // axios.get("/users")
  //   .then(function (res) {
  //     console.log(res)
  //   })

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
        <Route path='/contact' element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />

      </Routes>
      
      <Toaster  
        position='bottom-right'
        // reverseOrder={false}
       />
    </div>
  )
}

export default App
