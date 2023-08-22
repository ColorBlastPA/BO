// CommentPro.js
import React, { useState } from 'react';
import './style.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://api-colorblast.current.ovh/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: email,
                    password: password,
                }),
            });

            if (response.status === 200) {
                const { id } = await response.json();
                // Rediriger vers la page home avec l'ID récupéré
                window.location.href = `/home/${id}`;
            } else {
                setErrorMessage('Mail ou mot de passe incorrect');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
            setErrorMessage('Une erreur s\'est produite lors de la connexion');
        }
    };


    return (
        <div className="login-container">
            <h1 className="login-header">Partie Administrative</h1>
            <div className="login-form">
                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="mail"
                        placeholder="Entrez votre mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-button" onClick={handleLogin}>
                    Se connecter
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Login;

