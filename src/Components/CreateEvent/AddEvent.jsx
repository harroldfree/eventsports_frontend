import React, { useState, useEffect } from "react";
import axios from "axios";
import upload_img from '/upload_img.svg';

const AddEvent = () => {
  const [imag, setImag] = useState("");
  const [categories, setCategories] = useState([]); // Stocke les catégories
  const [eventDetails, setEventDetails] = useState({
    name: "",
    image: "",
    category: "",
    date: "",
    lieu: "",
    description: "",
  });

  // Récupération des catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
         await axios.get("/api/categorie").then((response) => {
// Supposons que le backend retourne un tableau de catégorie
setCategories(response.data); 
        }).catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      })
    };

    fetchCategories();
  }, []); // Exécuté une seule fois au montage du composant

  const imageHandler = (e) => {
    setImag(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const Add_Event = async () => {
    console.log(eventDetails);
    let product = { ...eventDetails };

    if (imag) {
      let formData = new FormData();
      formData.append("image", imag);

      try {
        const imageUploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Réponse du serveur :", imageUploadResponse.data); // Vérification

          product.image = imageUploadResponse.data.image_url;
          // setImag(imageUploadResponse.data.fileUrl)
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
        alert("Erreur lors du téléchargement de l'image");
        return;
      }
    }

    try {
      const response = await axios.post("/api/evenement", {
        nom_evenement: eventDetails.name,
        // :imag
        image: product.image,
        id_categorie: eventDetails.category,
        date_debut: eventDetails.date,
        lieu: eventDetails.lieu,
        description: eventDetails.description,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("authToken")
        },
      });

      if (response.status === 201) {
        alert("Évènement ajouté avec succès !");
        
        
      } else {
        alert("Erreur lors de l'ajout de l'évènement");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'évènement :", error);
      alert("Erreur lors de l'ajout de l'évènement");
    }
  };

  return (
    <div className="box-border w-full max-w-2xl p-8 m-5 rounded-md bg-white">
      <div className="w-full text-gray-500 text-base">
        <p>Nom de l'évènement</p>
        <input
          className="box-border w-full h-12 pl-4 border border-gray-300 outline-none text-gray-500"
          value={eventDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Entrer le nom"
        />
      </div>
      <div className="flex gap-10">
        <div className="w-full text-gray-500 text-base">
          <p>Date</p>
          <input
            className="box-border w-full h-12 pl-4 border border-gray-300 outline-none text-gray-500"
            value={eventDetails.date}
            onChange={changeHandler}
            type="date"
            name="date"
          />
        </div>
        <div className="w-full text-gray-500 text-base">
          <p>Lieu</p>
          <input
            className="box-border w-full h-12 pl-4 border border-gray-300 outline-none text-gray-500"
            value={eventDetails.lieu}
            onChange={changeHandler}
            type="text"
            name="lieu"
            placeholder="Entrer le lieu"
          />
        </div>
      </div>
      <div className="w-full text-gray-500 text-base">
        <p>Catégorie de l'annonce</p>
        <select
          value={eventDetails.category}
          onChange={changeHandler}
          name="category"
          className="w-full h-12 p-2.5 border border-gray-400 text-sm text-gray-500 rounded"
        >
          <option value="">Sélectionner</option>
          {categories.map((cat) => (
            <option key={cat.id_categorie} value={cat.id_categorie}>
              
              {cat.nom_categorie}
            </option>
            
          ))}
          
        </select>
      </div>
      <div className="w-full text-gray-500 text-base">
        <label htmlFor="file-input">
          <p>Importer une image</p>
          <img
            src={imag ? URL.createObjectURL(imag) : upload_img}
            // src=""
            className="h-28 w-28 rounded-lg object-contain my-2.5 cursor-pointer"
            alt=""
          />
        </label>
        <input
          className="hidden"
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
        />
      </div>
      <div className="w-full text-gray-500 text-base">
        <p>Description</p>
        <textarea
          className="box-border w-full h-36 pl-4 border border-gray-300 outline-none text-gray-500"
          value={eventDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Entrer la description de votre évènement"
        />
      </div>
      <button
        onClick={Add_Event}
        className="mt-5 w-40 h-12 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Ajouter
      </button>
    </div>
  );
};

export default AddEvent;
