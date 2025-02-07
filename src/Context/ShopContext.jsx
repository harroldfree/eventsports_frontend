import { createContext, useState } from "react";
import { products } from "../assets/annonce";
import axios from "axios";



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
                `/api/participation/${itemId}`, 
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("authToken")
                    }
                }
            );
                // Vérification de la réponse
            if (response.status === 200) { 
                // Copie de l'état actuel
                let listData = { ...listItems }; 
    
                if (listData[itemId]) {
                    console.log(itemId)
                    // Suppression de l'élément
                    delete listData[itemId];
                    // Mise à jour de l'état 
                    setListItems(listData); 
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