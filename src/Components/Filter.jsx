import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import ProductsItem from '../Components/ProductsItem';

const Filter = () => {
  const { products } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className='flex flex-col lg:flex-row gap-1 sm:gap-1 pt-10 border-t'>
      {/* Filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTRES
        </p>
        {/* CATEGORIE DE FILTRE */}
        <div className="border border-gray-300 pl-5 py-3 mt-6 lg:block">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Football'} onChange={toggleCategory} /> Football
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Tennis'} onChange={toggleCategory} /> Tennis
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Handball'} onChange={toggleCategory} /> Handball
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Basketball'} onChange={toggleCategory} /> Basketball
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'VolleyBall'} onChange={toggleCategory} /> VolleyBall
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Baseball'} onChange={toggleCategory} /> Baseball
            </p>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex-1">
        {/* Map Product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductsItem key={index} id={item._id} name={item.name} image={item.image} 
            date={item.date} category={item.category} id_utilisateur={item.id_utilisateur}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
