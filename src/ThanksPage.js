import React, { useEffect } from 'react';
import './ThanksPage.css'; // Assurez-vous d'ajouter le fichier CSS approprié

function ThanksPage() {
    useEffect(() => {
        // Bloquer la flèche retour du navigateur
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.pushState(null, null, window.location.href);
        };
    }, []);

    return (
        <div className="thanks-container">
            <img src="/launcher_icon.png" alt="Image de remerciement" className="thanks-image" />
            <h1 className="thanks-header">Merci pour vos commentaires</h1>
            <p className="thanks-message">À bientôt sur l'application ColorBlast.</p>
        </div>
    );
}

export default ThanksPage;
