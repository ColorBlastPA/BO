import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './clients.css';

function Clients() {
    const [clientData, setClientData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/client`); // Remplacez l'URL par votre endpoint API
            const responseData = await response.json();
            setClientData(responseData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données clients.', error);
        }
    }

    return (
        <div className="clients-container">
            <h1>Liste des Clients</h1>
            <ul className="client-list">
                {clientData.map(client => (
                    <li className="client-details" key={client.id}>
                        <div className="client-identity">
                            <p>Nom / Prénom : {client.lastname} {client.firstname}</p>
                            <p>Email : {client.mail}</p>
                        </div>
                        <div className="client-actions">
                            <Link to={`/clients/${client.id}`} className="details-button">
                                <span className="material-symbols-outlined">
                                    more_vert
                                </span>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clients;
