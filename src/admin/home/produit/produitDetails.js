import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productDetails.css'; // Assurez-vous d'avoir le bon chemin d'accès vers votre fichier CSS

function ProduitDetails() {
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
            const response = await fetch(`https://api-colorblast.current.ovh/products/${id}`);
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

    const handleSave = async () => {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/products/${id}`, {
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
        <div className="product-details-container">
            <h1>Détails du Produit</h1>
            {alertMessage && (
                <p className={`alert-message ${alertSuccess ? 'success' : 'error'}`}>{alertMessage}</p>
            )}
            {data ? (
                <div className="product-details">
                    <p><strong>Nom du produit :</strong> <input type="text" value={editableData.name || ''} onChange={e => handleFieldChange('name', e.target.value)} /></p>
                    <p><strong>Prix :</strong> <input type="number" step="0.01" value={editableData.price || ''} onChange={e => handleFieldChange('price', e.target.value)} /></p>
                    <p><strong>Description :</strong> <textarea value={editableData.description || ''} onChange={e => handleFieldChange('description', e.target.value)} /></p>
                    <p><strong>Catégorie :</strong> <input type="text" value={editableData.category || ''} onChange={e => handleFieldChange('category', e.target.value)} /></p>
                    <button className={`save-button ${isModified ? '' : 'disabled'}`} onClick={handleSave} disabled={!isModified}>Sauvegarder</button>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );

}

export default ProduitDetails;
