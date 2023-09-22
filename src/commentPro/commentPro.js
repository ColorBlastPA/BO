// CommentPro.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function CommentPro() {
    const { idPro, idClient } = useParams();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        fetchData();
    }, [idPro]);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/professionnel/${idPro}`);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données.', error);
        }
    }


    const handleCommentChange = (event) => {
        setComments(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const submitCommentAndRating = async () => {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/comments/createPro/${idClient}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idPro: parseInt(idPro),
                    content: comments,
                    note: parseInt(rating),
                }),
            });

            if (response.ok) {
                console.log('Commentaire et note soumis avec succès');
                setComments('');
                setRating('');
                window.location.href = `/thanksPage`;
            } else {
                console.error('Erreur lors de la soumission du commentaire et de la note');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du commentaire et de la note', error);
        }
    };


    return (
        <div className="comment-pro-container">
            <h1 className="comment-pro-header">Donner votre avis sur ce service !</h1>

            {data && (
                <div className="comment-pro-content">
                    <div className="professionnel-info">
                        <h3>Professionnel :</h3>
                        <p>Nom : {data.lastname}</p>
                        <p>Prénom : {data.firstname}</p>
                    </div>

                    <div className="comment-rating-section">
                        <h3>Commentaire et note :</h3>
                        <textarea
                            className="comment-input"
                            placeholder="Laissez un commentaire"
                            value={comments}
                            onChange={handleCommentChange}
                        />
                        <input
                            className="rating-input"
                            type="number"
                            min="1"
                            max="5"
                            placeholder="Note (1-5)"
                            value={rating}
                            onChange={handleRatingChange}
                        />

                    </div>
                    <button className="submit-button" onClick={submitCommentAndRating}>
                        Soumettre le commentaire et la note
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommentPro;

