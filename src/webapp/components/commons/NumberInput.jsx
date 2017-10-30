/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, {Component} from 'react';
/* Material design */
import {TextField} from 'material-ui';

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
    const {onChange, required, min, max} = this.props;
    if (required && !value) {
      this.setState({errorText: 'this field is required'});
      onChange(e, value);
    }
    else {
      if (!value.match(/^\d+(\.+\d{1,})?$/)) {
        this.setState({errorText: 'Only numbers'});
        onChange(e, value);
      } else {
        const numeric = parseFloat(value);
        if (min && numeric < min) {
          this.setState({errorText: 'Must be greater than ' + min});
        } else if (max && numeric > max) {
          this.setState({errorText: 'Must be lower than ' + max});
        } else {
          this.setState({errorText: ''})
        }
        onChange(e, numeric);
      }

    }

  }

  render() {
    const {name, value, placeholder, className, disabled, errMessage} = this.props;
    const {errorText} = this.state;
    return (
      <div className={`attributeFieldContainer ${className ? className : ''}`}>
        <label>{name ? `${name}:` : ':'}</label>
        <TextField
          id={name}
          name={name}
          hintText={placeholder}
          hintStyle={{paddingLeft: 10, paddingRight: 10}}
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
