import React, { useEffect, useState } from "react";
import './professionnels.css';
import {Link} from "react-router-dom"; // Import the CSS file

function Professionnels() {
    const [proData, setProData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel`); // Replace with your API endpoint URL
            const responseData = await response.json();
            setProData(responseData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données pro.', error);
        }
    }

    return (
        <div className="professionals-container">
            <h1>Professionnels</h1>
            <ul className="professional-list">
                {proData.map(pro => (
                    <li className="professional-item" key={pro.id}>
                        <div className="professionnel-details">
                            <p>Nom/Prénom : {pro.lastname} {pro.firstname}</p>
                            <p>Email : {pro.mail}</p>
                        </div>
                        <div className="professional-actions">
                            <Link to={`/professionnels/${pro.id}`} className="details-button">
                                Détails
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Professionnels;
