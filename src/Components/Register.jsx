import React, { useState } from "react";
import { Link } from "react-router-dom";
import accueil from "/accueil.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler une inscription réussie
    // alert(`Inscription réussie !\nNom d'utilisateur: ${formData.username}\nEmail: ${formData.email}`);
    // Réinitialiser le formulaire après soumission

    axios
      .post("/api/users", {
        nom: formData.username,
        email: formData.email,
        motdepasse: formData.password,
      })
      .then(function (response) {
        // console.log(response);
        toast.success(response.data.message)
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="min-h-full py-12  bg-gray-100">
      <h2 className="text-3xl underline font-bold mb-14 text-center text-gray-800">Formulaire d'Inscription</h2>
      <div className="  bg-gray-100 flex items-center justify-around max-md:flex-col">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-md:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                S'inscrire
              </button>
            </div>
            <div className="flex justify-between">
              <p>Êtes-vous déjà inscrit?</p>
              <Link className="text-blue-600" to="/connexion">
                Se connecter
              </Link>
            </div>
          </form>
          <img src="" alt="" />
        </div>
        <img
          className="max-w-md min-h-[424px] rounded-md max-2xl:h-[440px] max-lg:max-w-sm max-md:w-full mt-5 "
          src={accueil}
          alt=""
        />
      </div>
    </div>
  );
}

export default Register;
