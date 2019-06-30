import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCountries, getConversionRates, getCurrencies, getCountriesList, setBaseConversions} from "../redux/actions";
import InputBox from '../common/components/InputBox';
import CountrySearchResult from './CountrySearchResult';
import Conversions from './Conversions';

class CurrencyConverter extends Component {

    componentDidMount() {
        // fetch all countries data on init
        this.props.getCountries();

        // fetch conversion rates
        this.props.getConversionRates();

        // fetch currency list
        this.props.getCurrencies();
    }

    onSearch = e => {
        if (e.target.value.length > 0) {
            // fetch country list depending on input in search
            this.props.getCountriesList(e.target.value);
        }
    }

    onSelectCountry = e => {
        // setting base conversions on selection of country
        this.props.setBaseConversions(e.currentTarget.dataset.value);
    }

    render() {
        const { countryData, showConversions, countrySelected } = this.props;

        return (
            <React.Fragment>
                <div className= "input-search-parent">
                    <h1>CurrencyConverter</h1>
                    <InputBox inputId= "search" inputType= "text" inputMaxLength= "2" inputVal= {countrySelected} inputPlaceHolder= "Enter Country Code" onInputChange= {this.onSearch} />
                    {countryData && <CountrySearchResult countryData= {countryData} onSelectCountry= {this.onSelectCountry} />} 
                </div>
                {showConversions && <Conversions />}
            </React.Fragment>
        );
    }
} 

const mapStateToProps = (state) => {
    return {
        countryData: state.CountryReducer.countryData,
        showConversions: state.CountryReducer.showConversions,
        countrySelected: state.CountryReducer.countrySelected,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getCountries, getConversionRates, getCurrencies, getCountriesList, setBaseConversions}, dispatch);
}

CurrencyConverter = connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);

export default CurrencyConverter;
