import React from 'react'
import { Link } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';

const ProductsItem = ({id,image,name,category,date, id_utilisateur}) => {

  return (
    <Link to={`/product/${id}`} className=' text-gray-700 cursor-pointer '>
        <div className="w-[200px] h-[150px] overflow-hidden">
            <img src={image[0]} alt="" className='w-[150px] h-[150px] object-cover hover:scale-110 transition ease-in-out' />
        </div>
        <div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='pt-3 pb-1'>{date}</p>
            <button className=' bg-blue-600 w-28 h-8 rounded-sm hover:bg-red-600 text-gray-950'>{category}</button>
            <p className='text-xl'>{id_utilisateur}</p>
        </div>
       
    </Link>
  )
}

export default ProductsItem