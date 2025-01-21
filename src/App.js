import React, {useEffect, useRef, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import AddProduct from './components/AddProduct/AddProduct';
import SearchBar from './components/SearchBar/SearchBar';
import SortBar from './components/SortBar/SortBar';
import './App.css';

const App = () => {
    const {t} = useTranslation();
    const [products, setProducts] = useState([
        {id: 1, name: "Product 1", description: "Description 1", price: 10, quantity: 5},
        {id: 2, name: "Product 2", description: "Description 2", price: 20, quantity: 3}
    ]);
    const [cart, setCart] = useState([]);
    const [language, setLanguage] = useState("en");
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('name');
    const isRenderedRef = useRef(false);

    const changeLanguage = (lng) => {
        setLanguage(lng);
        i18n.changeLanguage(lng);
    };

    const addProduct = (newProduct) => {
        setProducts([
            ...products,
            {id: products.length + 1, ...newProduct},
        ]);
    };

    const addToCart = (product) => {
        if (product.quantity > 0) {
            const existingProduct = cart.find((item) => item.id === product.id);
            if (existingProduct) {
                setCart(
                    cart.map((item) =>
                        item.id === product.id
                            ? {...item, quantity: item.quantity + 1}
                            : item
                    )
                );
            } else {
                setCart([...cart, {...product, quantity: 1}]);
            }

            setProducts(
                products.map((p) =>
                    p.id === product.id ? {...p, quantity: p.quantity - 1} : p
                )
            );
        }
    };


    const removeFromCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                setCart(
                    cart.map((item) =>
                        item.id === product.id
                            ? {...item, quantity: item.quantity - 1}
                            : item
                    )
                );
            } else {
                setCart(cart.filter((item) => item.id !== product.id));
            }

            setProducts(
                products.map((p) =>
                    p.id === product.id ? {...p, quantity: p.quantity + 1} : p
                )
            );
        }
    };


    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
        setCart(cart.filter((item) => item.id !== id));
    };

    const confirmSale = () => {
        setCart([]);
    };

    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'price' || sortOption === 'quantity') {
                return a[sortOption] - b[sortOption];
            }
            return a.name.localeCompare(b.name);
        });

    useEffect(() => {
        if (isRenderedRef.current) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        isRenderedRef.current = true;
    }, [cart]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    return (
        <Router>
            <div>
                <header>
                    <h1>{t('products')}</h1>
                    <nav>
                        <Link to="/">{t('products')}</Link> | <Link to="/cart">{t('cart')}</Link>
                    </nav>
                    <div>
                        <label>{t('language')}: </label>
                        <button onClick={() => changeLanguage('en')}>EN</button>
                        <button onClick={() => changeLanguage('hy')}>HY</button>
                        <button onClick={() => changeLanguage('ru')}>RU</button>
                    </div>
                </header>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <AddProduct addProduct={addProduct} products={products}/>
                                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                                <SortBar setSortOption={setSortOption}/>
                                <ProductList
                                    products={filteredProducts}
                                    addToCart={addToCart}
                                    deleteProduct={deleteProduct}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                cart={cart}
                                removeFromCart={removeFromCart}
                                confirmSale={confirmSale}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
