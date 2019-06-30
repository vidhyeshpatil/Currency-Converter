import React from 'react';
import PropTypes from 'prop-types';

const CountrySearchResult = ({ countryData, onSelectCountry }) => {
    
    CountrySearchResult.propTypes = {
        countryData: PropTypes.array,
        onSelectCountry: PropTypes.func
    };

    return (
        <ul>
            {(countryData.length > 0) ? MapCountryResults(countryData, onSelectCountry) : <li>No Results Found</li>}
        </ul>
    );
}

const MapCountryResults = (countryData, onSelectCountry) => {
    return (
        countryData.map((elem, index) => (
            <li key= {index} data-value= {JSON.stringify(elem)} onClick= {onSelectCountry}>{elem.countryName}</li>
        )) 
    );
}

export default CountrySearchResult;
