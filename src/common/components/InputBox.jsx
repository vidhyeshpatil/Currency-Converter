import React from 'react';
import PropTypes from 'prop-types';

const InputBox = ({inputId, inputType, inputVal, inputPlaceHolder, inputMaxLength = "20", inputDisabled = "", onInputChange}) => {

    InputBox.propTypes = {
        inputId: PropTypes.string,
        inputVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        inputType: PropTypes.string,
        inputPlaceHolder: PropTypes.string,
        inputMaxLength: PropTypes.string,
        inputDisabled: PropTypes.string,
        onInputChange: PropTypes.func
    };

    return (
        <input 
            type = {inputType} 
            value = {inputVal} 
            placeholder = {inputPlaceHolder}
            data-id = {inputId}
            disabled = {inputDisabled}
            maxLength = {inputMaxLength}
            onChange = {onInputChange} 
        />
    );
};

export default InputBox;
