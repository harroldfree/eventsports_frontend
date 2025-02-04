import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
// import UnsubscribeEvent from '../Components/UnsubscribeFromEvent';

function Reservation () {
    const { productId } = useParams();
    const { products, unsubscribeFromEvent } = useContext(ShopContext);
    const navigate = useNavigate();

    const productData = products.find(item => item._id === Number(productId));

    const handleUnsubscribe = () => {
      if (window.confirm('Êtes-vous sûr de vouloir vous désinscrire de cet événement ?')) {
          unsubscribeFromEvent(Number(productId)); // Appeler la fonction de désinscription
          navigate('/reservation'); // Rediriger l'utilisateur vers la page d'accueil
      }
  };

    return productData ?(
        (
            <div className='p-4'>
              <h1 className='text-2xl font-bold'>Vous êtes inscrits à l'événement</h1>
              <div className='mt-4'>
              <div className="w-[200px] h-[150px] overflow-hidden">
                <img src={productData.image[0]} alt="" className='w-[150px] h-[150px] object-cover hover:scale-110 transition ease-in-out' />
              </div>
                <h2 className='text-xl'>{productData.name}</h2>
                <p className='mt-2'>{productData.category}</p>
                <p className='mt-2'>{productData.date}</p>
                <p className='mt-2'>{productData.description}</p>
                <button
                    onClick={handleUnsubscribe}
                    className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ease-in-out'
                >
                    Se désinscrire
                </button>
              </div>
              
            </div>
          )
            
          
        ) : <div className='text-center text-2xl mt-10'>Produit non trouvé</div>

}


export default Reservation

