import { createContext, useState } from "react";
import { products } from "../assets/annonce";
import axios from "axios";
// const id_user = localStorage.getItem("myid");
// import { toast } from "react-toastify";


export const ShopContext = createContext() 
const ShopContextProvider = (props) => {

    const [listItems,setListItems] = useState({})
   
    const addToList = async (itemId) => {

        let listData = structuredClone(listItems)

        if (listData[itemId]) {
            if (listData[itemId]) {
                listData[itemId] += 1;
                
            }
            else{
                listData[itemId] = 1;
            }
            
        }
        else{
            listData[itemId] = {};
            listData[itemId] = 1 ;
        }
        setListItems(listData)
 

    }

    // Fonction pour se désinscrire d'un événement
    const unsubscribeFromEvent = async (itemId) => {
        try {
            const response = await axios.delete(
                `/api/participation/${itemId}`, // Correction de l'URL
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("authToken")
                    }
                }
            );
    
            if (response.status === 200) { // Vérification de la réponse
                let listData = { ...listItems }; // Copie de l'état actuel
    
                if (listData[itemId]) {
                    console.log(itemId)
                    delete listData[itemId]; // Suppression de l'élément
                    setListItems(listData); // Mise à jour de l'état
                } else {
                    console.warn("L'élément n'existe pas dans la liste.");
                }
            } else {
                console.error("Erreur lors de la désinscription :", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la désinscription :", error);
        }
    };
    
    const value = {
        products , listItems, addToList,unsubscribeFromEvent
    }
    return (
        
             <ShopContext.Provider value={value} >
                {props.children}
             </ShopContext.Provider>

        
    )


}

export default ShopContextProvider