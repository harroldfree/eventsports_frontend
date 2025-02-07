import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditEvent = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({
    name: "",
    image_url: "",
    category: "",
    date: "",
    lieu: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    // Récupérer les catégories
    axios.get("/api/categorie")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
      

    // Récupérer les détails de l'événement
    axios.get(`/api/evenement/${id}`, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("authToken") }
    })
      .then(response => {
        console.log("Détails de l'événement récupérés :", response.data); // Ajout d'un log
        setEventDetails(response.data);
        setImagePreview( "http://localhost:3000" + response.data.image_url); // Stocker l'URL actuelle de l'image
      })
      .catch(error => console.error("Erreur lors de la récupération de l'événement :", error));
  }, [id]);

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file)); // Mettre à jour l'aperçu de l'image
  };

  const updateEvent = async () => {
    let updatedData = { ...eventDetails };

    if (newImage) {
      let formData = new FormData();
      formData.append("image", newImage);

      try {
        const imageUploadResponse = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        updatedData.image_url =  imageUploadResponse.data.fileUrl;
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
        return;
      }
    }

    try {
      await axios.put(`/api/evenement/${id}`, updatedData, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("authToken")
        }
      });
      alert("Événement mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Modifier l'événement</h2>
      <input 
        type="text" 
        name="name" 
        value={eventDetails.name} 
        onChange={handleChange} 
        placeholder="Nom de l'événement" 
        className="block w-full p-2 border mb-2"
      />
      <select name="category" value={eventDetails.category} onChange={handleChange} className="block w-full p-2 border mb-2">
        {categories.map(cat => (
          <option key={cat.id_categorie} value={cat.id_categorie}>{cat.nom_categorie}</option>
        ))}
      </select>
      <input 
        type="date" 
        name="date" 
        value={eventDetails.date} 
        onChange={handleChange} 
        className="block w-full p-2 border mb-2"
      />
      <input 
        type="text" 
        name="lieu" 
        value={eventDetails.lieu} 
        onChange={handleChange} 
        placeholder="Lieu" 
        className="block w-full p-2 border mb-2"
      />
      <textarea 
        name="description" 
        value={eventDetails.description} 
        onChange={handleChange} 
        placeholder="Description" 
        className="block w-full p-2 border mb-2"
      />
      
      {/* Affichage de l'image actuelle ou nouvelle */}
      <div className="mb-2">
        <p className="text-gray-700">Image actuelle :</p>
        <img 
          src={imagePreview || "/default-image.jpg"} 
          alt="Événement" 
          className="w-32 h-32 object-cover rounded-md shadow-md"
        />
      </div>

      <input type="file" onChange={handleImageChange} className="block w-full p-2 border mb-2" />
      
      <button onClick={updateEvent} className="bg-blue-500 text-white px-4 py-2 rounded">
        Mettre à jour
      </button>
    </div>
  );
};

export default EditEvent;
