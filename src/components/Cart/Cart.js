import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import './Cart.css';

const Cart = ({cart, removeFromCart, confirmSale, setCart, isRenderedRef}) => {
    const {t} = useTranslation();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


    useEffect(() => {
        if (!isRenderedRef.current) {
            const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];

            localStorage.setItem('cart', JSON.stringify(savedProducts));
            setCart(savedProducts);
        }

        if (isRenderedRef.current) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        isRenderedRef.current = true;
    }, [cart]);

    return (
        <div className="cart-container">
            <h2 className="cart-header">{t('cart')}</h2>
            {cart.length === 0 ? (
                <p>{t('cartIsEmpty')}</p>
            ) : (
                <ul className="cart-item-list">
                    {cart.map((item) => (
                        <li className="cart-item" key={item.id}>
                            <div>
                                <h3 className="cart-item-title">{item.name}</h3>
                                <p className="cart-item-price">
                                    {t('price')}: {item.price}
                                </p>
                                <p className="cart-item-quantity">
                                    {t('quantity')}: {item.quantity}
                                </p>
                            </div>
                            <button
                                className="cart-remove-button"
                                onClick={() => removeFromCart(item)}
                            >
                                {t('removeOne')}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <h3 className="cart-total">
                {t('total')}: {total.toFixed(2)}
            </h3>
            <button className="cart-confirm-button" onClick={confirmSale}>
                {t('confirmSale')}
            </button>
        </div>
    );
};

export default Cart;
