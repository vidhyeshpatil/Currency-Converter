import React from 'react';
import PropTypes from 'prop-types';

const InputBox = ({inputId, inputType, inputVal, inputMaxLength = "20", inputDisabled = "", onInputChange}) => {

    InputBox.propTypes = {
        inputId: PropTypes.string,
        inputVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        inputType: PropTypes.string,
        inputMaxLength: PropTypes.string,
        inputDisabled: PropTypes.string,
        onInputChange: PropTypes.func
    };

    return (
        <input 
            type = {inputType} 
            value = {inputVal} 
            data-id = {inputId}
            disabled = {inputDisabled}
            maxLength = {inputMaxLength}
            onChange = {onInputChange} 
        />
    )
};

export default InputBox;