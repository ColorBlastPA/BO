import React, {useEffect, useState} from "react";

function Professionnels() {
    const [proData, setProData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:8080/professionnel`); // Remplacez l'URL par votre endpoint API
            const responseData = await response.json();
            setProData(responseData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données pro.', error);
        }
    }

    return (
        <div>
            <h1>Professionnels</h1>
            <ul>
                {proData.map(pro => (
                    <li key={pro.id}>
                        <p>Nom/Prénom : {pro.lastname} {pro.firstname}</p>
                        <p>Email : {pro.mail}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Professionnels;