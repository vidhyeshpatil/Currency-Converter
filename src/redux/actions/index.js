import config from "../../utils/config";
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
} from "./actionTypes";

const headers = config.headers;
const BASE_URL = config.BASE_URL;

async function handleAPICall(params) {

    const apiObj = {
        method: params.TYPE || "GET",
        credentials: "same-origin",
        headers
    }

    if(params.TYPE === "POST") {
        apiObj.body = JSON.stringify(params.data);
    }

    const response = await fetch(params.END_POINT, apiObj);

    if(response) {

        const resJson = await response.json();

        try {
            params.dispatch({type: params.successAction, payload: resJson, data: params.data});
        } catch (e) {
            params.dispatch({type: params.failedAction, payload: resJson});
        }
    }
}

export function getCountries() {
    return dispatch => {
        const params = {
            dispatch,
            END_POINT: `${BASE_URL}/countries`,
            successAction: COUNTRY_DATA_SUCCESS,
            failedAction: COUNTRY_DATA_FAILURE, 
        }

        handleAPICall(params);
    };
}

export function getCurrencies() {
    return dispatch => {
        const params = {
            dispatch,
            END_POINT: `${BASE_URL}/currency`,
            successAction: CURRENCY_LIST_SUCCESS,
            failedAction: CURRENCY_LIST_FAILURE, 
        }

        handleAPICall(params);
    };
}

export function getConversionRates() {
    return dispatch => {
        const params = {
            dispatch,
            END_POINT: `${BASE_URL}/rates`,
            successAction: CONVERSION_RATES_SUCCESS,
            failedAction: CONVERSION_RATES_FAILURE, 
        }

        handleAPICall(params);
    };
}

export function getCountriesList(searchVal) {
    return {
        type: FETCH_COUNTRY_LIST,
        payload: searchVal,
    };
}

export function setBaseConversions(countrySelected) {
    return {
        type: SET_BASE_CONVERSIONS,
        payload: countrySelected,
    }
}

export function updateConversionValue(value) {
    return {
        type: UPDATE_CONVERSION_VALUE,
        payload: value,
    }
}

export function updateBaseValue(value) {
    return {
        type: UPDATE_BASE_VALUE,
        payload: value,
    }
}

export function calculateConversionValue(value) {
    return {
        type: CALC_CONVERSION_VALUE,
        payload: value,
    }
}