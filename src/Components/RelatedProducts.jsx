import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductsItem from './ProductsItem'
import Title from './Title'

const RelatedProducts = ({category}) => {

    const {products} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(()=>{
        if (products.length > 0) {
            
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item)=> category === item.category)
            // productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory)

            setRelated(productsCopy.slice(0,4))

        }
    },[products])

  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
            <Title  text1={'Evenements'} text2={'Similaires'}/>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {related.map((item)=>(
                <ProductsItem key={item.id_evenement} id={item._id} name={item.nom_evenement} image={item.image} category={item.nom_categorie}/>
            ))}
        </div>

    </div>
  )
}

export default RelatedProducts