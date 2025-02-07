import React from 'react'
import { Link } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';

const ProductsItem = ({id,image,name,category,date, lieu}) => {

  return (
    <Link to={`/product/${id}`} className=' text-gray-700 cursor-pointer '>
       
        <div className="flex flex-col items-center bg-gray-100 p-2 rounded-lg shadow-md">
        <img src={image[0]} alt="" className="w-36 h-36  mb-4 object-cover hover:scale-110 transition ease-in-out  " />
        <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-600">{date}</p>
            <p className="text-sm text-gray-500 mt-2">{lieu}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                {category}
            </button>

        </div>
</div>
       
    </Link>
  )
}

export default ProductsItem