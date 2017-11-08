/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration */
/* React */
import React, { Component } from 'react';
/* Material design */
import { TextField } from 'material-ui';

/**
 * Component that renders an Material textInput
 * */
export default class AttributeInput extends Component {
  render() {
    const { name, value, placeholder, className, disabled, errMessage , onChange} = this.props;
    return (
      <div className={`attributeFieldContainer ${className ? className : ''}`}>
        <label>{name ? `${name}:` : ':'}</label>
        <TextField
          id={name}
          name={name}
          hintText={placeholder}
          hintStyle={{ paddingLeft: 10, paddingRight: 10 }}
          className="textInput"
          onChange={onChange}
          value={value}
          disabled={disabled}
          errorText={errMessage}
        />
      </div>
    );
  }
};
