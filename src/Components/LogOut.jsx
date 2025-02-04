import React 
// { useState }
 from 'react';

function LogOut () {
     // État pour simuler la connexion/déconnexion
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    // const [user, setUser] = useState({ email: 'utilisateur@example.com' });

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        // Supprimer le jeton d'authentification du localStorage
        localStorage.removeItem('authToken');
        // Rediriger l'utilisateur vers la page de connexion
        window.location.href = '/connexion';
        // setIsLoggedIn(false);
        // setUser(null);
        // alert('Déconnexion réussie !');
    };

    return (
        // <div className="min-h-screen flex items-center justify-center bg-gray-100">
        // <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        //     {isLoggedIn ? (
        //     <>
        //         <h2 className="text-2xl font-bold mb-6 text-gray-800">Bienvenue, {user.email} !</h2>
        //         <button
        //         onClick={handleLogout}
        //         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        //         >
        //         Se déconnecter
        //         </button>
        //     </>
        //     ) : (
        //     <h2 className="text-2xl font-bold text-gray-800">Vous êtes déconnecté.</h2>
        //     )}
        // </div>
        // </div>
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