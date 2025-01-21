import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import './AddProduct.css';

const AddProduct = ({addProduct}) => {
    const {t} = useTranslation();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            ...product,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity, 10),
        };

        if (
            newProduct.name &&
            newProduct.description &&
            !isNaN(newProduct.price) &&
            !isNaN(newProduct.quantity)
        ) {
            addProduct(newProduct);

            setProduct({name: '', description: '', price: '', quantity: ''});
        } else {
            alert(t('invalidInput'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{t('addProduct')}</h2>
            <input
                type="text"
                name="name"
                placeholder={t('name')}
                value={product.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                placeholder={t('description')}
                value={product.description}
                onChange={handleChange}
            />
            <input
                type="number"
                name="price"
                placeholder={t('price')}
                value={product.price}
                onChange={handleChange}
            />
            <input
                type="number"
                name="quantity"
                placeholder={t('quantity')}
                value={product.quantity}
                onChange={handleChange}
            />
            <button type="submit">{t('addProduct')}</button>
        </form>
    );
}

export default AddProduct;
