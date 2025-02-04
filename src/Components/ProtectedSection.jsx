const ProtectedSection = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return null;
  }

  return children;
};

export default ProtectedSection;