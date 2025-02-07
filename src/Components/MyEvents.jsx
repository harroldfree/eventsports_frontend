import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function MyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const id_user = localStorage.getItem("myid"); // Assurez-vous que l'ID utilisateur est bien stocké

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const response = await axios.get(`/api/participation/${id_user}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("authToken")
                    }
                });
                setEvents(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erreur lors de la récupération des événements:", error);
                toast.error("Erreur lors de la récupération des événements");
            } finally {
                setLoading(false);
            }
        };

        if (id_user) {
            fetchUserEvents();
            
        }
    }, [id_user]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mes Événements</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map(event => (
                        <div key={event.id_evenement} className="border p-4 rounded shadow">
                            <img src={`http://localhost:3000${event.image_url}`} alt={event.nom_evenement} className="w-full h-40 object-cover mb-2" />
                            <h2 className="text-lg font-semibold">{event.nom_evenement}</h2>
                            <p className="text-sm text-gray-600">{event.date}</p>
                            <button
                                onClick={() => navigate(`/reservation/${event.id_evenement}`)}
                                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Voir Détails
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun événement trouvé.</p>
            )}
        </div>
    );
}

export default MyEvents;
