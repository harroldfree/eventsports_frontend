import React from 'react'
import logo from '../assets/logo.png'
// import search from '../assets/search.png'
import profil from '../assets/profil.png'
// import cart from '../assets/cart.png'
import menu from '../assets/menu.png'
import cart_cross_icon from '../assets/cart_cross_icon.png'
import { Link, NavLink } from 'react-router-dom'
// import { ShopContext } from '../Context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = React.useState(false);

 

  return (
    <div className='z-[1000] sticky  top-[-30px] left-0 right-5  d-flex flex items-center justify-between py-5 font-medium bg-white h-32'>
        <div className="flex items-center w-25 h-25">
           <Link to='/'><img src={logo} alt="logo du site" className='w-12 h-12' /></Link>
           
           
        </div>
        <ul className="hidden lg:flex gap-5 text-sm text-gray-700 hidden">
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>Accueil</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/reservation' className='flex flex-col items-center gap-1'>
                <p>Mes reservations</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>A propos</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>Contact</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
           
        </ul>

        <div className="flex items-center gap-6">
            
            <div className="group relative">
                <img src={profil} className='w-7 cursor-pointer' alt="logo users" />
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                    <div className="flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                        <p className="cursor-pointer hover:text-black">Mon dasboard</p>
                        {/* <p className="cursor-pointer hover:text-black">Autres</p> */}
                        <p className="cursor-pointer hover:text-black">Déconnexion</p>
                    </div>
                </div>
            </div>
            <img onClick={()=> setVisible(true)} src={menu} alt="" className='w-5 cursor-pointer lg:hidden ' />
          
        </div>

        {/* Sidebar menu for small screens */}

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0' } `}>
            <div className="flex  text-gray-600">
        
                <div onClick={()=> setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                    <img src={cart_cross_icon} className='h-4 rotate-180' alt="" />
                    <p className="">Retour</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>Accueil</NavLink>
                <NavLink  onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/reservation'>Mes reservations</NavLink>
                <NavLink  onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/apropos'>A Propos</NavLink>
                <NavLink  onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar