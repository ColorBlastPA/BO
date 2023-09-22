import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./waitingDetails.css"

function WaitingDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel/certif/${id}`);
            const responseData = await response.json();
            console.log(responseData);
            setData(responseData);
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données.', error);
        }
    }

    async function handleValidateClick() {
        try {
            const updatedData = { ...data.pro, waiting: false };
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                setAlertMessage('Le professionnel a été validé avec succès.');
                setAlertSuccess(true);
                // Vous pouvez mettre à jour d'autres états ou effectuer d'autres actions ici si nécessaire.
            } else {
                setAlertMessage('Erreur lors de la validation du professionnel.');
                setAlertSuccess(false);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la validation du professionnel.', error);
            setAlertMessage('Une erreur s\'est produite lors de la validation du professionnel.');
            setAlertSuccess(false);
        }
    }

    async function handleRefuseClick() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAlertMessage('Le professionnel a été refusé avec succès.');
                setAlertSuccess(true);
            } else {
                setAlertMessage('Erreur lors du refus du professionnel.');
                setAlertSuccess(false);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors du refus du professionnel.', error);
            setAlertMessage('Une erreur s\'est produite lors du refus du professionnel.');
            setAlertSuccess(false);
        }
    }

    return (
        <div className="professional-details-container">
            <h1>Détails du Professionnel</h1>
            <p className={`alert-message ${alertSuccess ? 'success' : 'error'}`}>{alertMessage}</p>
            {data ? (
                <div className="professional-details">
                    <p><strong>Nom/Prénom :</strong> <span>{data.pro.lastname} {data.pro.firstname}</span></p>
                    <p><strong>Email :</strong> <span>{data.pro.mail}</span></p>
                    <p><strong>Pays :</strong> <span>{data.pro.country}</span></p>
                    <p><strong>Département :</strong> <span>{data.pro.department}</span></p>
                    <p><strong>Code Postal :</strong> <span>{data.pro.postal_code}</span></p>
                    <p><strong>Ville :</strong> <span>{data.pro.city}</span></p>
                    <p><strong>Nom de l'entreprise :</strong> <span>{data.pro.company_name}</span></p>
                    <p><strong>Prix :</strong> <span>{data.pro.price}</span></p>
                    <p><strong>Téléphone :</strong> <span>{data.pro.phone}</span></p>
                    <p><strong>Description :</strong> <span>{data.pro.description}</span></p>

                    {/* Afficher le lien PDF avec le nom de fichier */}
                    <div className="pdf-link">
                        <strong>Certificat :
                            <a href={data.certificate.url} target="_blank" rel="noopener noreferrer">
                                <p>{data.certificate.filename}</p>
                            </a>
                        </strong>
                    </div>

                    <div className="buttons">
                        <button className="action-button refuse" onClick={handleRefuseClick}>
                            Refuser
                        </button>
                        <button className="action-button validate" onClick={handleValidateClick}>
                            Valider
                        </button>
                    </div>

                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
}

export default WaitingDetails;
