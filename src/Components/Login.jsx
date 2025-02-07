import React, { useState } from "react";
import { Link } from "react-router-dom";
import accueil from "/accueil.png";
import axios from "axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

function Login() {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [error, setError] = useState("");

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simuler une connexion réussie
    // localStorage.setItem('authToken', 'votre-jeton-d-authentification');
    // window.location.href = '/';

    axios
      .post("/api/users/login", {
        email: formData.email,
        motdepasse: formData.password,
      })
      .then(function (response) {
        console.log(response.data);
        toast.success(response.data.message)
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("myname", response.data.user.nom);
        localStorage.setItem("myid", response.data.user.id);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });

    // alert(`Connexion réussie !\nEmail: ${formData.email}`);
  };

  return (
    <div className="min-h-full py-12  bg-gray-100 ">
      <h2 className="text-3xl underline font-bold mb-16 text-center text-gray-800 ">Connexion</h2>
      <div className=" bg-gray-100 flex justify-around max-md:flex-col items-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md  max-md:max-w-sm">
          <form onSubmit={handleSubmit} className=" space-y-6">
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
                Se connecter
              </button>
            </div>
            <div className="flex justify-between">
              <p>
                Vous n'avez pas <br /> de compte?
              </p>
              <Link className="text-blue-600" to="/register">
                S'inscrire
              </Link>
            </div>
          </form>
        </div>
        <img className="max-w-md h-[355px] rounded-md  max-lg:max-w-sm max-md:w-full  mt-5 " src={accueil} alt="" />
      </div>
    </div>
  );
}

export default Login;
