// common functions - defined & declared to re-use across application

// functions checks selected country currency present in conversion rates or not
export function checkCurrency(selectedCountryObj, allCountries, conversionRatesObj) {
    let baseCurrency;

    if (conversionRatesObj.hasOwnProperty(selectedCountryObj.countryCurrency)) {

        baseCurrency = selectedCountryObj.countryCurrency;
    } else {
        let countryBorders = selectedCountryObj.countryBorders;

        // check in bordering countries
        if (countryBorders.length > 0) {

            outer_loop:
            for (let i = 0, len = allCountries.length; i < len; i++) {
                
                for (let j = 0, len = countryBorders.length; j < len; j++) {
                    
                    console.log(allCountries[i].cca3, countryBorders[j]);
                    if (allCountries[i].cca3 === countryBorders[j]) {
                        
                        if (conversionRatesObj.hasOwnProperty(allCountries[i].currency)) {
                            baseCurrency = allCountries[i].currency;
                            break outer_loop;
                        } 
                        continue;
                    }
                }
            }

        } else { // pick first currency found in same continent
            let countryRegion = selectedCountryObj.countryRegion;

            for (let i = 0, len = allCountries.length; i < len; i++) {

                if (allCountries[i].region === countryRegion) {
                    baseCurrency = allCountries[i].currency;
                    break;
                }
                continue;
            }
        }
    }

    return baseCurrency;
}