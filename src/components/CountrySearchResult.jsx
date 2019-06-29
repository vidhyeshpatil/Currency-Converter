import React from 'react';
import PropTypes from 'prop-types';

const CountrySearchResult = ({ countryData, onSelectCountry }) => {
    
    CountrySearchResult.propTypes = {
        countryData: PropTypes.array,
        onSelectCountry: PropTypes.func
    };

    return (
        <ul>
            {countryData.map((elem, index) => (
                <li key= {index} data-value= {JSON.stringify(elem)} onClick= {onSelectCountry} >{elem.countryName}</li> 
            ))}
        </ul>
    );
}

export default CountrySearchResult;