import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import toast from 'react-hot-toast';
import axios from "axios";

function Product() {
    const { productId } = useParams();
    const { products, addToList } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Participer à l'évènement");
    const [userId, setUserId] = useState("")

    const handAddToList = async (productId) => {
        setIsLoading(true);
        try {

            const reqBody = {
                "id_user":userId,
                "id_evenement":productId
            }
    
            const response = await axios.post(
                `/api/participation`, reqBody,{
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("authToken")
                    }
                }
            );
    
            if (response.status === 200 || response.status === 201) {
                setButtonText("Vous êtes inscrits à cet évènement");
                toast.success("Vous êtes inscrits à l'événement");
    
                setTimeout(() => {
                    setIsLoading(false);
                    navigate(`/reservation/${productId}`);
                }, 4000);
            } else {
                throw new Error("Échec de l'inscription");
            }
    
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            toast.error("Erreur lors de l'inscription");
            setIsLoading(false);
        }
    



       

        setTimeout(() => {
            toast.success("Vous êtes inscrits à l'événement");
        }, 3000);

        setTimeout(() => {
            setIsLoading(false);
            navigate(`/reservation/${productId}`);
        }, 4000);
    };

    const fetchProductData = async () => {
        const resp =  await axios.get(`/api/evenement/${productId}`, {
            headers: { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("authToken")
        }})
       
        if(resp.data) {
            setProductData(resp.data);
            setImage('http://localhost:3000' + resp.data.image_url);
            setUserId(resp.data.id_user);
        } else {
            return <div className="text-center text-2xl mt-10">Product not found</div>;
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Data */}
            <div className="flex gap-12 lg:gap-12 flex-col sm:flex-row">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 lg:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                    <img onClick={() => setImage('http://localhost:3000' + productData.image_url)} src={image} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className='w-full h-auto' src={image} alt="" />
                    </div>
                </div>
                {/* Product information */}
                <div className="flex-1">
                    <h1 className='font-medium text-2xl mt-2'>{productData.nom_evenement}</h1>
                    <div className="flex justify-between gap-2 items-center"></div>
                    <p className='mt-5 text-gray-800 md:w-4/5'>{productData.description}</p>
                    <button disabled={isLoading} onClick={() => handAddToList(productData.id_evenement)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 '>
                        {isLoading ? "loading" : buttonText}
                    </button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>Le sport, c'est la vie : participez, performez, triomphez !</p>
                        <p>Unis par le sport, ensemble pour la victoire !</p>
                        <p>Cet événement sportif est bien plus qu'une simple compétition; c'est une célébration de l'esprit d'équipe, de la détermination et de la passion. Que vous soyez athlète ou spectateur, chaque moment passé ici est une occasion de se dépasser, de soutenir les autres et de vivre des émotions intenses. Rejoignez-nous pour une journée inoubliable où chaque effort compte et chaque victoire est partagée. Ensemble, nous pouvons atteindre de nouveaux sommets et créer des souvenirs qui dureront toute une vie.</p>
                    </div>
                </div>
            </div>
            
        </div>
    ) : <div className='opacity-0'></div>;
}

export default Product;
