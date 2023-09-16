import React, { useEffect, useState } from "react";
import './waitingList.css';
import {Link} from "react-router-dom"; // Import the CSS file

function Waiting() {
    const [proData, setProData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel/waiting`); // Replace with your API endpoint URL
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
                {proData.map(proItem => (
                    <li className="professional-details" key={proItem.pro.id}>
                        <div className="professional-identity">
                            <p>Nom / Prénom : {proItem.pro.lastname} {proItem.pro.firstname}</p>
                            <p>Email : {proItem.pro.mail}</p>
                        </div>
                        <div className="professional-actions">
                            <Link to={`/waiting/${proItem.pro.id}`} className="details-button">
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

export default Waiting;
