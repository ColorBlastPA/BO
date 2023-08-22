import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./professionalDetails.css"

function ProfessionalDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [editableData, setEditableData] = useState({});
    const [isModified, setIsModified] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        if (data) {
            setEditableData(data);
        }
    }, [data]);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel/${id}`);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données.', error);
        }
    }

    const handleFieldChange = (fieldName, value) => {
        setEditableData(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
        setIsModified(true);
    };

    const handlePasswordChange = async () => {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/forgotPassword/${data.mail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setAlertMessage('Le mot de passe a été changé avec succès');
                setAlertSuccess(true);
            } else {
                setAlertMessage('Erreur lors du changement de mot de passe');
                setAlertSuccess(false);
            }
        } catch (error) {
            setAlertMessage('Une erreur s\'est produite lors du changement de mot de passe.');
            setAlertSuccess(false);
        }
        //setIsModified(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableData),
            });

            if (response.ok) {
                setIsModified(false);
                setAlertMessage('Les données ont été mises à jour avec succès');
                setAlertSuccess(true);
            } else {
                setAlertMessage('Erreur lors de la mise à jour des données');
                setAlertSuccess(false);
            }
        } catch (error) {
            setAlertMessage('Une erreur s\'est produite lors de la sauvegarde des données.');
            setAlertSuccess(false);
        }
    };

    return (
        <div className="professional-details-container">
            <h1>Détails du Professionnel</h1>
            <p className={`alert-message ${alertSuccess ? 'success' : 'error'}`}>{alertMessage}</p>
            {data ? (
                <div className="professional-details">
                    <p><strong>Nom/Prénom :</strong> {data.lastname} {data.firstname}</p>
                    <p><strong>Email :</strong> {data.mail}</p>
                    <p><strong>Pays :</strong> <input type="text" value={editableData.country || ''} onChange={e => handleFieldChange('country', e.target.value)} /></p>
                    <p><strong>Département :</strong> <input type="text" value={editableData.department || ''} onChange={e => handleFieldChange('department', e.target.value)} /></p>
                    <p><strong>Code Postal :</strong> <input type="text" value={editableData.postal_code || ''} onChange={e => handleFieldChange('postal_code', e.target.value)} /></p>
                    <p><strong>Ville :</strong> <input type="text" value={editableData.city || ''} onChange={e => handleFieldChange('city', e.target.value)} /></p>
                    <p><strong>Nom de l'entreprise :</strong> <input type="text" value={editableData.company_name || ''} onChange={e => handleFieldChange('company_name', e.target.value)} /></p>
                    <p><strong>Prix :</strong> <input type="number" step="0.01" value={editableData.price || ''} onChange={e => handleFieldChange('price', e.target.value)} /></p>
                    <p><strong>Téléphone :</strong> <input type="text" value={editableData.phone || ''} onChange={e => handleFieldChange('phone', e.target.value)} /></p>
                    <p><strong>Note :</strong> <input type="number" min="0" max="5" value={editableData.note || ''} onChange={e => handleFieldChange('note', e.target.value)} /></p>
                    <p><strong>Description :</strong> <textarea value={editableData.description || ''} onChange={e => handleFieldChange('description', e.target.value)} /></p>
                    <button className="edit-button" onClick={handlePasswordChange}>Nouveau mot de passe</button>
                    <button className={`save-button ${isModified  ? '' : 'disabled'}`} onClick={handleSave} disabled={!isModified}>Sauvegarder</button>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
}

export default ProfessionalDetails;
