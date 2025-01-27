import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductsItem from './ProductsItem'




const BestEvent = () => {

    const {products} = useContext(ShopContext)
    const [bestEvent,setBestEvent] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item)=>(item.bestevent)); 
        setBestEvent(bestProduct.slice(1,3))
    }, [])

  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title  text1={"MEILLEUR"} text2={"ÉVÉNEMENT"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
            L'événement sportif a été un véritable succès, rassemblant des participants enthousiastes et un public nombreux. Grâce à une organisation impeccable, des compétitions palpitantes et une ambiance conviviale, tous les objectifs ont été atteints.
            </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestEvent.map((item,index)=> (
                    <ProductsItem key={index} id={item._id} name={item.name} image={item.image} 
                    date={item.date} category={item.category} id_utilisateur={item.id_utilisateur}/>
                )
                   
                )
            }
        </div>

    </div>
  )
}

export default BestEvent