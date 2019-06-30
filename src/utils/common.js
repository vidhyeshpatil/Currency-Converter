// common functions - defined & declared to re-use across application

import { forEach, has, isArray, isString, keys } from 'lodash';

// functions checks selected country currency present in conversion rates or not
export function checkCurrency(selectedCountryObj, allCountries, conversionRatesObj) {
    let baseCurrency;
    
    if (hasOwnProperty(conversionRatesObj, selectedCountryObj.countryCurrency)) {

        baseCurrency = selectedCountryObj.countryCurrency;
    } else {
        const { countryBorders } = selectedCountryObj;

        // checks the currency present in bordering country
        if (countryBorders.length > 0) {

            forEach(countryBorders, (border) => {
                forEach(allCountries, (country) => {
                    const { cca3, currency } = country;
    
                    if (cca3 === border && hasOwnProperty(conversionRatesObj, currency)) {
                        baseCurrency = currency;
                        return false;    
                    }
                });
    
                if (baseCurrency) {
                    return false;
                }
            });
        }
        
        // if currency not present in bordering country
        // checks in the continent
        if (!baseCurrency) {
            const { countryRegion } = selectedCountryObj;
            
            forEach(allCountries, (country) => {
                const { region, currency } = country;

                if (region === countryRegion && hasOwnProperty(conversionRatesObj, currency)) {
                    baseCurrency = currency;
                    return false;
                }
            });
        }
    }

    return baseCurrency;      
}

export function hasOwnProperty(object, props) {
  
    // checks if currency is a single value
    if (isString(props)) {
        return has(object, props);
    }

    // checks if currency has a multiple value
    if (isArray(props)) {
        let hasProperty;

        forEach(props, (prop) => {
            hasProperty = (keys(object).indexOf(prop) !== -1);
            return !hasProperty;
        });

        return hasProperty;
    }

    return false;
}
