import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateConversionValue, updateBaseValue, calculateConversionValue } from "../redux/actions";
import InputBox from '../common/components/InputBox';
import DropDown from '../common/components/DropDown';

class Conversions extends React.Component {

    onBaseChange = e => {
        // calculate the conversion value on change of base value
        this.props.updateConversionValue(e.target.value);
    }

    onConversionChange = e => {
        // calculates the base value on change of conversion value
        this.props.updateBaseValue(e.target.value);
    }

    onDropDownChange = value => {
        // calculate the conversion value depending on currency selection
        this.props.calculateConversionValue(value);
    }

    render() {
        const { baseValue, baseCurrency, conversionValue, conversionCurrencySelected, currencyList } = this.props;
        
        return (
            <div className= "conversion-parent">
                <h1>Conversions</h1>
                <div className= "from-Base-to-Conversion">From Base Currency</div>
                <div className= "conversion-wrapper">
                    <InputBox inputId= "base-input" inputType= "number" inputVal= {baseValue} onInputChange= {this.onBaseChange} />
                    <div className= "baseCurrency">{baseCurrency}</div>
                </div>
                <div className= "from-Base-to-Conversion">To Converted Currency</div>
                <div className= "conversion-wrapper">
                    <InputBox inputId= "conversion-input" inputType= "number" inputVal= {conversionValue} inputDisabled= {(conversionCurrencySelected) ? "" : "disabled"} onInputChange= {this.onConversionChange} />
                    <DropDown DDOptions= {currencyList} DDSelectedValue= {conversionCurrencySelected} DDPlaceholder= "Select Currency..." onDropDownChange= {this.onDropDownChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        baseValue: state.CountryReducer.baseValue,
        baseCurrency: state.CountryReducer.baseCurrency,
        conversionValue: state.CountryReducer.conversionValue,
        conversionCurrencySelected: state.CountryReducer.conversionCurrencySelected,
        currencyList: state.CountryReducer.currencyList,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateConversionValue, updateBaseValue, calculateConversionValue }, dispatch);
}

Conversions = connect(mapStateToProps, mapDispatchToProps)(Conversions);

export default Conversions;
