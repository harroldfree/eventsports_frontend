import { createContext, useState } from "react";
import { products } from "../assets/annonce";
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
    const unsubscribeFromEvent = (itemId) => {
        let listData = structuredClone(listItems);

        if (listData[itemId]) {
            delete listData[itemId]; // Supprimer l'élément de la liste
            setListItems(listData); // Mettre à jour l'état
        } else {
            console.warn("L'élément n'existe pas dans la liste.");
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