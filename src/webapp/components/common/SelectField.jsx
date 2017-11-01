/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React from 'react';
/* Material design */
import { SelectField, MenuItem } from 'material-ui';

/**
 * Component that renders an Material select box
 * */
const Select = ({ name, value, placeholder, className, onChange, items, disabled }) => (
  <div className={`attributeFieldContainer ${className ? className : ''}`}>
    <label>{name}:</label>
    <SelectField
      id={name}
      onChange={onChange}
      value={value}
      hintText={placeholder}
      hintStyle={{ paddingLeft: 10, paddingRight: 10 }}
      className="textInput"
      disabled={disabled}
    >
      {items.map(({ value, text }) => (
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
