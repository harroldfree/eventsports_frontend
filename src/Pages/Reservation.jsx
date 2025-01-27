import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
function Reservation () {
    const { productId } = useParams();
    const { products } = useContext(ShopContext);
    const productData = products.find(item => item._id === Number(productId));

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
              </div>
            </div>
          )
            
          
        ) : <div className='text-center text-2xl mt-10'>Produit non trouvé</div>

}


export default Reservation