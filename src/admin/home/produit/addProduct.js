import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './addProduct.css';
function AddProduct() {
    const [productData, setProductData] = useState({
        name: '',
        price: 0,
        description: '',
        category: 'ACCESSORY',
        image: '',
    });

    const [isProductAdded, setIsProductAdded] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const imageFile = files[0];
            setProductData({
                ...productData,
                image: imageFile,
            });
        } else {
            setProductData({
                ...productData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { name, price, description, category } = productData;

            const requestBody = {
                name,
                price,
                description,
                category,
            };

            const response = await axios.post('https://api-colorblast.current.ovh/products', requestBody);

            if (response.status === 201) {
                const productId = response.data.id;
                // Envoi de l'image à la route /setImageProduct/{id} ici
                const formData = new FormData();
                formData.append('file', productData.image);
                const imageResponse = await fetch(`https://api-colorblast.current.ovh/api/setImageProduct/${productId}`, {
                    method: 'POST',
                    body: formData,
                });

                if (imageResponse.status === 200) {
                    setIsProductAdded(true);
                } else {
                    console.error('Erreur lors de l\'envoi de l\'image.');
                }
            } else {
                console.error('Erreur lors de la création du produit.');
            }
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }
    };


    return (
        <div className="add-product-container">
            <h1>Ajouter un produit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom du produit:</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Prix:</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Catégorie:</label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                    >
                        <option value="ACCESSORY">Accessoire</option>
                        <option value="EXTERN">Extérieur</option>
                        <option value="INTERN">Intérieur</option>

                    </select>
                </div>
                <button type="submit">Ajouter le produit</button>
            </form>
            {isProductAdded && (
                <p className="confirmation-message">Le produit a bien été ajouté.</p>
            )}
        </div>
    );
}

export default AddProduct;
