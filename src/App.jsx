
import './App.css'
import 'boxicons'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Contact from './Pages/Contact'
import Reservation from './Pages/Reservation'
import About from './Pages/About'
import Home from './Pages/Home'
import Product from './Pages/Product'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reservation/:productId' element={<Reservation />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />

      </Routes>
      
       
    </div>
  )
}

export default App
