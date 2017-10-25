/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import React from 'react';
import {SelectField, MenuItem} from 'material-ui';

const Select = ({name, value, placeholder, className, onChange, items, disabled}) => (
    <div className={`attributeFieldContainer ${className ? className : ''}`} style={{flex : 1.5}}>
        <label>{name}:</label>
        <SelectField
            id={name}
            onChange={onChange}
            value={value}
            hintText={placeholder}
            hintStyle={{paddingLeft : 10, paddingRight : 10}}
            className="textInput"
            disabled={disabled}
        >
            {items.map(({value, text}) => (
                <MenuItem
                    key={value}
                    value={value}
                    primaryText={text}
                />
            ))}
        </SelectField>
    </div>
);

export default Select;
