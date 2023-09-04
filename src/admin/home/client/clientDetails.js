import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './clientDetails.css';

function ClientDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [editableData, setEditableData] = useState({});
    const [isModified, setIsModified] = useState(false);
    const [isPasswordChange, setIsPasswordChange] = useState(false);
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
            const response = await fetch(`https://api-colorblast.current.ovh/client/${id}`);
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
            const response = await fetch(`https://api-colorblast.current.ovh/forgotPasswordClient/${data.mail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsPasswordChange(true);
                setAlertSuccess(true);
                setAlertMessage('Le mot de passe a été changé avec succès');
            } else {
                setAlertMessage('Erreur lors du changement de mot de passe');
            }
        } catch (error) {
            setAlertMessage('Une erreur s\'est produite lors du changement de mot de passe.');
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/client`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableData),
            });

            if (response.ok) {
                setIsModified(false);
                setIsPasswordChange(false);
                setAlertSuccess(true);
                setAlertMessage('Les modifications ont été sauvegardées avec succès.');
            } else {
                console.error('Erreur lors de la mise à jour des données');
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données.', error);
        }
    };

    return (
        <div className="client-details-container">
            <h1>Détails du Client</h1>
            {alertMessage && <p className={`alert-message ${alertSuccess ? 'success' : ''}`}>{alertMessage}</p>}
            {data ? (
                <div className="client-details">
                    <p><strong>Nom / Prénom :</strong> <span>{data.lastname} {data.firstname}</span></p>
                    <p><strong>Email :</strong> <input type="text" value={editableData.mail || ''} onChange={e => handleFieldChange('mail', e.target.value)} /></p>
                    <p><strong>Pays :</strong> <input type="text" value={editableData.country || ''} onChange={e => handleFieldChange('country', e.target.value)} /></p>
                    <p><strong>Département :</strong> <input type="text" value={editableData.department || ''} onChange={e => handleFieldChange('department', e.target.value)} /></p>
                    <p><strong>Code postal :</strong> <input type="text" value={editableData.postal_code || ''} onChange={e => handleFieldChange('postal_code', e.target.value)} /></p>
                    <p><strong>Ville :</strong> <input type="text" value={editableData.city || ''} onChange={e => handleFieldChange('city', e.target.value)} /></p>
                    <p><strong>Adresse :</strong> <input type="text" value={editableData.address || ''} onChange={e => handleFieldChange('address', e.target.value)} /></p>
                    <p><strong>Admin :</strong> <input type="checkbox" checked={editableData.admin || false} onChange={e => handleFieldChange('admin', e.target.checked)} /></p>
                    <div className="buttons">
                        <button className="edit-button" onClick={handlePasswordChange}>Nouveau mot de passe</button>
                        <button className={`save-button ${isModified  ? '' : 'disabled'}`} onClick={handleSave} disabled={!isModified }>Sauvegarder</button>
                    </div>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
}

export default ClientDetails;
