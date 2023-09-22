import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './commentProduct.css';

function CommentProduct() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/orders/idKey/${id}`);
            const responseData = await response.json();

            setData(responseData);

        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données.', error);
        }
    }

    const [comments, setComments] = useState({});

    const handleCommentChange = (productId, comment) => {
        setComments((prevComments) => ({
            ...prevComments,
            [productId]: { ...prevComments[productId], comment },
        }));
    };

    const handleRatingChange = (productId, rating) => {
        setComments((prevComments) => ({
            ...prevComments,
            [productId]: { ...prevComments[productId], rating },
        }));
    };

    const submitComments = async () => {
        if (data && data.idClient) {
            const idClient = data.idClient;

            const commentsData = Object.keys(comments).map(productId => ({
                idProduct: parseInt(productId),
                content: comments[productId]?.comment || '',
                note: parseInt(comments[productId]?.rating) || 0,
            }));


            try {
                const response = await fetch(`https://api-colorblast.current.ovh/comments/create/${idClient}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commentsData)
                });

                if (response.status === 201) {
                    console.log('Commentaires soumis avec succès');
                    window.location.href = `/thanksPage`;
                } else {
                    console.error('Erreur lors de la soumission des commentaires');
                }
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la soumission des commentaires.', error);
            }
        }
    };

    const uniqueProducts = {}; // Un objet pour stocker les produits uniques par ID

    if (data) {
        data.product.forEach((product) => {
            uniqueProducts[product.id] = product;
        });
    }

    return (
        <div className="container-product">
            <h1 className="header">Donner votre avis sur nos produits !</h1>

            {data && (
                <div>
                    <h3>Produits  :</h3>
                    <ul className="product-list">
                        {Object.values(uniqueProducts).map((product) => (
                            <li key={product.id} className="product-item">
                                <p className="product-name">Nom : {product.name}</p>
                                <input
                                    type="text"
                                    className="comment-product-input"
                                    placeholder="Laissez un commentaire"
                                    value={comments[product.id]?.comment || ''}
                                    onChange={(e) => handleCommentChange(product.id, e.target.value)}
                                />

                                <input
                                    type="number"
                                    className="rating-product-input"
                                    min="1"
                                    max="5"
                                    placeholder="Note"
                                    value={comments[product.id]?.rating || ''}
                                    onChange={(e) => handleRatingChange(product.id, e.target.value)}
                                />
                            </li>
                        ))}
                    </ul>
                    <button className="submit-product-button" onClick={submitComments}>Soumettre les commentaires</button>

                </div>
            )}
        </div>
    );

}

export default CommentProduct;

