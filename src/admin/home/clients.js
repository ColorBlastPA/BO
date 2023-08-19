import React, { useEffect, useState } from 'react';

function Clients() {
    const [clientData, setClientData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:8080/client`); // Remplacez l'URL par votre endpoint API
            const responseData = await response.json();
            setClientData(responseData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données clients.', error);
        }
    }

    return (
        <div>
            <h1>Clients</h1>
            <ul>
                {clientData.map(client => (
                    <li key={client.id}>
                        <p>Nom/Prénom : {client.lastname} {client.firstname}</p>
                        <p>Email : {client.mail}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clients;
