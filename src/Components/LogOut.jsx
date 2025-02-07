import React 
// { useState }
 from 'react';

function LogOut () {

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        // Supprimer le jeton d'authentification du localStorage
        localStorage.removeItem('authToken');
        // Rediriger l'utilisateur vers la page de connexion
        window.location.href = '/connexion';
       
    };

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Déconnexion</h2>
                <p className="mb-6 text-gray-600">Êtes-vous sûr de vouloir vous déconnecter ?</p>
                <button
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                Se déconnecter
                </button>
            </div>
        </div>
    );
};




export default LogOut