import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [images, setImages] = useState({}); // Stocker les images par ID d'événement

  // Récupérer les événements depuis le backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/evenement", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("authToken"),
          },
        });
        setEvents(response.data);

        // Récupérer les images pour chaque événement
        response.data.forEach(async (event) => {
          try {
            const imgResponse = await axios.get(`/api/evenement/${event.id_evenement}/image`);
            setImages((prev) => ({
              ...prev,
              [event.id_evenement]: imgResponse.data.image_url,
            }));
          } catch (error) {
            console.error("Erreur lors de la récupération de l'image :", error);
          }
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    };

    fetchEvents();
  }, []);

  // Supprimer un événement
  const deleteEvent = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;

    try {
      await axios.delete(`/api/evenement/${id}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("authToken"),
        },
      });
      setEvents(events.filter((event) => event.id_evenement !== id));
      alert("Événement supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Liste des événements</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Catégorie</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Lieu</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id_evenement} className="text-center">
              <td className="border p-2">{event.nom_evenement}</td>
              <td className="border p-2">
                <img
                  src={images[event.id_evenement] || "/default-image.jpg"}
                  alt={`Image de ${event.nom_evenement}`}
                  className="w-16 h-16 object-cover rounded-md shadow-md"
                />
              </td>
              <td className="border p-2">{event.nom_categorie}</td>
              <td className="border p-2">{event.date_debut}</td>
              <td className="border p-2">{event.lieu}</td>
              <td className="border p-2">
                <button
                  onClick={() =>
                    (window.location.href = `/editevent/${event.id_evenement}`)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteEvent(event.id_evenement)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;




