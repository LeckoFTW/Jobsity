/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, { Component } from 'react';
/* Material design */
import { TextField } from 'material-ui';
/* Utils */
import { isNumberFormat } from '../../utils/validator';

/**
 * Component that renders an Material NumberInput
 * */
export default class NumberInput extends Component {
  /**
   * Handle event for input text change and validate the new value
   * */
  handleChange(e, value) {
    const { onChange } = this.props;
    if (isNumberFormat(value)) {
      onChange(e, parseFloat(value));
    } else {
      onChange(e, value);
    }
  }

  render() {
    const { name, value, placeholder, className, disabled, errMessage } = this.props;
    return (
      <div className={`attributeFieldContainer ${className ? className : ''}`}>
        <label>{name ? `${name}:` : ':'}</label>
        <TextField
          id={name}
          name={name}
          hintText={placeholder}
          hintStyle={{ paddingLeft: 10, paddingRight: 10 }}
          className="textInput"
          onChange={this.handleChange.bind(this)}
          value={value}
          disabled={disabled}
          errorText={errMessage}
        />
      </div>
    );
  }
};
