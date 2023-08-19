import React, { useState } from 'react';
import './style.css';
import Clients from "./clients";
import Professionnels from "./Professionnels";
import Produits from "./produits";
import EnAttente from "./enAttente"; // Importez le fichier CSS pour les styles

function Home() {
    const [activeTab, setActiveTab] = useState('Clients');

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <div className="navbar">
                <button
                    className={activeTab === 'Clients' ? 'active' : ''}
                    onClick={() => handleTabChange('Clients')}
                >
                    Clients
                </button>
                <button
                    className={activeTab === 'Professionnels' ? 'active' : ''}
                    onClick={() => handleTabChange('Professionnels')}
                >
                    Professionnels
                </button>
                <button
                    className={activeTab === 'Produits' ? 'active' : ''}
                    onClick={() => handleTabChange('Produits')}
                >
                    Produits
                </button>
                <button
                    className={activeTab === 'EnAttentes' ? 'active' : ''}
                    onClick={() => handleTabChange('EnAttentes')}
                >
                    En attentes
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'Clients' && <Clients />}
                {activeTab === 'Professionnels' && <Professionnels />}
                {activeTab === 'Produits' && <Produits/>}
                {activeTab === 'EnAttentes' && <EnAttente/>}
            </div>
        </div>
    );
}

export default Home;


