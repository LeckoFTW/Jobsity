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
import { isEmpty, isNumberFormat } from '../../utils/validator';

/**
 * Component that renders an Material NumberInput
 * */
export default class NumberInput extends Component {
  state = {
    errorText: ''
  };

  /**
   * Handle event for input text change and validate the new value
   * */
  handleChange(e, value) {
    const { onChange, required } = this.props;
    let errorText = '';
    if (required && isEmpty(value)) {
      errorText = 'this field is required';
      onChange(e, value);
    }
    else {
      if (isNumberFormat(value)) {
        onChange(e, parseFloat(value));
      } else {
        errorText = 'Only numbers';
        onChange(e, value);
      }
    }
    this.setState({ errorText });

  }

  render() {
    const { name, value, placeholder, className, disabled, errMessage } = this.props;
    const { errorText } = this.state;
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
          errorText={errMessage || errorText}
        />
      </div>
    );
  }
};
