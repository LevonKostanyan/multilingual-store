import React from 'react';
import {useTranslation} from 'react-i18next';
import './SearchBar.css';

const SearchBar = ({searchQuery, setSearchQuery}) => {
    const {t} = useTranslation();

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
