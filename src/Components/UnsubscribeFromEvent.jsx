import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
imp


function UnsubscribeEvent() {
  
  const { unsubscribeFromEvent } = useContext(ShopContext);
  // État initial des événements auxquels l'utilisateur est inscrit
  const [events, setEvents] = useState();


  const { productId } = useParams();

  // Fonction pour se désinscrire d'un événement
 

  return (
    <div>
      <h1>Mes Événements Inscrits</h1>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            {event.name}
            <button onClick={() => unsubscribeFromEvent(event.id)}>Se désinscrire</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnsubscribeEvent;