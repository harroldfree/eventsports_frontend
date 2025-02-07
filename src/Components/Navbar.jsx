import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import user from "/user.svg";

import menu from "../assets/menu.png";
import cart_cross_icon from "../assets/cart_cross_icon.png";
import { Link, NavLink } from "react-router-dom";
import ProtectedSection from "./ProtectedSection";


const Navbar = () => {
  const authToken = localStorage.getItem("authToken");
  const [myName, setMyName] = useState("")
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    setMyName(localStorage.getItem('myname'))
  }, [])

  return (
    <div className="z-[1000] sticky  top-[-30px] left-0 right-5  flex  items-center justify-between py-5 font-medium bg-white h-32">
      <div className="flex items-center w-25 h-25">
        <Link to="/">
          <img src={logo} alt="logo du site" className="w-12 h-12" />
        </Link>
      </div>
      <ul className="hidden lg:flex gap-5 text-sm text-gray-700 hidden">
        <ProtectedSection>
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>Accueil</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/reservation" className="flex flex-col items-center gap-1">
            <p>Mes reservations</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/createevent" className="flex flex-col items-center gap-1">
            <p>Créer un évènement</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          
        </ProtectedSection>
      </ul>

      <div className="flex items-center gap-6">
        <ProtectedSection>
          <div className="flex items-center gap-1 group relative">
            <p>{myName}</p>
            <img src={user} className="w-7 cursor-pointer" alt="logo users" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <NavLink to="/deconnexion">
                  <p className="cursor-pointer hover:text-black">Déconnexion</p>
                </NavLink>
              </div>
            </div>
          </div>
        </ProtectedSection>
        <ProtectedSection>
            <img onClick={() => setVisible(true)} src={menu} alt="" className="w-5 cursor-pointer lg:hidden " />
        </ProtectedSection>
      </div>

      {/* Sidebar menu for small screens */}
      <ProtectedSection>
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full text-sm h-44" : "w-0"
          } `}
        >
          <div className="flex flex-col text-gray-600 mb-20">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
              <img src={cart_cross_icon} className="h-4 rotate-180" alt="" />
              <p className="">Retour</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className="py-1 pl-6 border text-sm" to="/">
              Accueil
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-1 pl-6 border" to="/reservation">
              Mes reservations
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-1 pl-6 border" to="/createevent">
              Créer un évènement
            </NavLink>
            
          </div>
        </div>
      </ProtectedSection>
      {!authToken && (
        <div className="flex items-center gap-2">
          <NavLink to="/connexion">
            <button className="bg-white w-32 h-7 rounded-md hover:bg-slate-100 font-bold  transition duration-300 ease-in-out transform hover:scale-105">
              Connexion
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="bg-white w-32 h-7 rounded-md hover:bg-slate-100 font-bold  transition duration-300 ease-in-out transform hover:scale-105">
              S'inscrire
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
