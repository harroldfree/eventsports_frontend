import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/connexion" />;
  }

  return children;
};
export default ProtectedRoute;