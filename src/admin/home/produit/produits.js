import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./produit.css"

function Produits() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`https://api-colorblast.current.ovh/products`);
            const responseData = await response.json();
            setProductData(responseData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données product.', error);
        }
    }

    return (
        <div className="products-container">
            <h1>Liste des Produits</h1>
            <ul className="product-list">
                {productData.map(product => (
                    <li className="product-details" key={product.id}>
                        <div className="product-identity">
                            <p>Nom du produit : {product.name}</p>
                        </div>
                        <div className="product-actions">
                            <Link to={`/produits/${product.id}`} className="details-button">
                                <span className="material-symbols-outlined">
                                    more_vert
                                </span>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default Produits;