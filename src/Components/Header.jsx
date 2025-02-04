import header from '../assets/header.png'
import { NavLink } from 'react-router-dom'
const authToken = localStorage.getItem("authToken");
function Header () {
    
    return (
        <div className="flex justify-around items-center p-5 my-3 bg-neutral-100 max-sm:flex-col ">
            <div className='mb-10'>
                <h1 className="text-5xl font-bold ">Donnez vie à votre <br /> passion sportive</h1>
                <p className="text-xl mb-3 mt-3">Participer ou organiser un évènement</p>
                {!authToken && (
                <NavLink to='/register'><button className="w-44 h-8 text-sm text-white bg-black rounded-md ">Créer un évènement</button></NavLink>
                 )}   

            </div>
            <img className=" w-[350px] h-[350px] max-sm:w-[400px]  " src= {header} alt="" />

        </div>
    )
}



export default Header