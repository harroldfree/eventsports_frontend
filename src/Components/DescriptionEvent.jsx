import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from "axios";
import toast from "react-hot-toast"; 

function DescriptionEvent () {
    const { productId } = useParams();
    const { unsubscribeFromEvent } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const navigate = useNavigate();
    const [image, setImage] = useState('');

    const handleUnsubscribe = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir vous désinscrire de cet événement ?')) {
            try {
                // Supprime l'inscription en base
                await unsubscribeFromEvent(Number(productId)); 
                toast.success("Vous avez été désinscrit avec succès !");
                // Met à jour l'état pour refléter la suppression
                setProductData(null); 
                navigate('/'); 
            } catch (error) {
                toast.error("Erreur lors de la désinscription.");
                console.error("Erreur de désinscription:", error);
            }
        }
    };

    const fetchProductData = async () => {
        try {
            const resp = await axios.get(`/api/evenement/${productId}`, {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                }
            });

            if (resp.data) {
                setProductData(resp.data);
                setImage('http://localhost:3000' + resp.data.image_url);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
             // Mettre à jour l'état si l'événement est introuvable
            setProductData(null);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    if (!productData) {
        return <div className='text-center text-2xl mt-10'></div>;
    }

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Vous êtes inscrits à l'événement</h1>
            <div className='mt-4'>
                <div className="w-[200px] h-[150px] overflow-hidden">
                    <img src={image} alt={productData.nom_evenement} className='w-[150px] h-[150px] object-cover hover:scale-110 transition ease-in-out' />
                </div>
                <h2 className='text-xl'>{productData.nom_evenement}</h2>
                <p className='mt-2'>{productData.nom_categorie}</p>
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
    );
}

export default DescriptionEvent;
