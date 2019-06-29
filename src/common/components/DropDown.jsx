import React from "react";
import Select from "react-autocomplete";
import PropTypes from 'prop-types';

const DropDown = ({DDClass = "dropdown", DDPlaceholder, DDSelectedValue, DDOptions, onDropDownChange}) => {
    
    DropDown.propTypes = {
        DDClass: PropTypes.string,
        DDPlaceholder: PropTypes.string,
        DDSelectedValue: PropTypes.string,
        onDropDownChange: PropTypes.func
    };

    return (
        <Select 
            className = {DDClass}
            placeholder = {DDPlaceholder}
            value = {DDSelectedValue}
            items = {DDOptions}
            getItemValue= {item => item.label}
            renderItem={(item, highlighted) =>
                <div key={item.id} style={{ cursor: 'pointer', backgroundColor: highlighted ? '#eee' : 'transparent'}}>
                  {item.label}
                </div>
            }
            onSelect = {onDropDownChange}
        />
    );
}

export default DropDown;