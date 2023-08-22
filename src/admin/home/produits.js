import React, {useEffect, useState} from "react";

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
        <div>
            <h1>Professionnels</h1>
            <ul>
                {productData.map(product => (
                    <li key={product.id}>
                        <p>Nom du produit : {product.name}</p>

                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Produits;