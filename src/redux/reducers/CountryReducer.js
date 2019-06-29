import {
    COUNTRY_DATA_SUCCESS,
    COUNTRY_DATA_FAILURE,
    CURRENCY_LIST_SUCCESS,
    CURRENCY_LIST_FAILURE,
    CONVERSION_RATES_SUCCESS,
    CONVERSION_RATES_FAILURE,
    FETCH_COUNTRY_LIST,
    SET_BASE_CONVERSIONS,
    UPDATE_BASE_VALUE,
    UPDATE_CONVERSION_VALUE,
    CALC_CONVERSION_VALUE,
} from "../actions/actionTypes";
import { checkCurrency } from "../../utils/common";

const initialState = {
    allCountries: undefined,
    currencyData: undefined,
    currencyList: undefined,
    conversionRates: undefined,
    countryData: undefined,
    countryList: undefined,
    countrySelected: undefined,
    baseValue: 1000,
    baseCurrency: undefined,
    conversionValue: undefined,
    conversionCurrencySelected: undefined,
    showConversions: false,
};

const CountryReducer = function(state = initialState, {type, payload}) {
    switch(type) {
        case COUNTRY_DATA_SUCCESS:
            return {
                ...state,
                allCountries: payload,
            };
        case CONVERSION_RATES_SUCCESS:
            return {
                ...state,
                conversionRates: payload,
            };
        case CURRENCY_LIST_SUCCESS:
            const currencyList = [];

            Object.keys(payload).forEach((key, index) => {

                if (state.conversionRates.hasOwnProperty(key)) {
                    currencyList.push({id: index, label: key, value: payload[key].decimal_digits});
                }
            });

            return {
                ...state,
                currencyData: payload,
                currencyList,
            };
        case CONVERSION_RATES_FAILURE:
        case CURRENCY_LIST_FAILURE:
        case COUNTRY_DATA_FAILURE:
            // handled error with an alert over here..
            alert("Unknown Error Occuered");
            return {
                ...state,
            };
        case FETCH_COUNTRY_LIST:

            // fetching & modifying data as per payload
            let countryData = state.allCountries
                .filter(country => country.cca2.toLowerCase().startsWith(payload.toLowerCase()))
                .map(country => (
                    {
                        countryName: country.name.common, 
                        countryCode: country.cca2,
                        countryCurrency: country.currency[0],
                        countryBorders: country.borders,
                        countryRegion: country.region,
                    }
                ));

            // checkCurrency(country.currency, country.borders, country.region)
            // checks for payload length - if single value, fetch first five results else exact result
            countryData = (payload.length === 1) ? countryData.slice(0, 5) : countryData;
            
            return {
                ...state,
                countryData,
            };
        case SET_BASE_CONVERSIONS:
            const selectedCountryObj = JSON.parse(payload);
            const baseCurrency = checkCurrency(selectedCountryObj, state.allCountries, state.conversionRates);

            return {
                ...state,
                baseCurrency,
                showConversions: true,
                countryData: undefined,
            };
        case UPDATE_CONVERSION_VALUE:
            let conversionVal = (payload * state.conversionRates[state.conversionCurrencySelected]).toFixed(state.currencyData[state.conversionCurrencySelected].decimal_digits);

            return {
                ...state,
                baseValue: payload,
                conversionValue: conversionVal,
            };
        case UPDATE_BASE_VALUE:
            let baseValue = (payload * state.conversionRates[state.baseCurrency]).toFixed(state.currencyData[state.baseCurrency].decimal_digits);

            return {
                ...state,
                conversionValue: payload,
                baseValue,
            };
        case CALC_CONVERSION_VALUE:
            let conversionValue = (state.baseValue * state.conversionRates[payload]).toFixed(state.currencyData[payload].decimal_digits);

            return {
                ...state,
                conversionCurrencySelected: payload,
                conversionValue,
            };
        default:
            return state;
    }
};

export default CountryReducer;