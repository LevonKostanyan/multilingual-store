import React from 'react';
import {useTranslation} from 'react-i18next';
import './SortBar.css';

const SortBar = ({setSortOption}) => {
    const {t} = useTranslation();

    return (
        <div className="sort-bar">
            <label className="sort-bar-label">{t('sortBy')}: </label>
            <select
                className="sort-bar-select"
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="name">{t('name')}</option>
                <option value="price">{t('price')}</option>
                <option value="quantity">{t('quantity')}</option>
            </select>
        </div>
    );
};

export default SortBar;
