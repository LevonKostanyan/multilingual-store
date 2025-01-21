import React from 'react';
import {useTranslation} from 'react-i18next';
import './ProductList.css';

const ProductList = ({products, addToCart, deleteProduct}) => {
    const {t} = useTranslation();
    return (
        <div>
            <ul className="product-list">
                {products.map((product) => (
                    <li className="product-list-item" key={product.id}>
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <p className="product-details">
                            {t('price')}: {product.price}
                        </p>
                        <p className="product-details">
                            {t('quantity')}: {product.quantity}
                        </p>
                        {product.quantity > 0 ? (
                            <button
                                className="add-to-cart-button"
                                onClick={() => addToCart(product)}
                            >
                                {t('addToCart')}
                            </button>
                        ) : (
                            <span className="out-of-stock-message">{t('outOfStock')}</span>
                        )}
                        <button
                            className="remove-product-button"
                            onClick={() => deleteProduct(product.id)}
                        >
                            {t('remove')}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
