/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration */
/* React */
import React, { Component } from 'react';
/* Material design */
import { TextField, RaisedButton } from 'material-ui';

/**
 * Component that renders an Material textInput with a button that handles the component submition
 * */
export default class InputFieldWithButton extends Component {
  state = {
    inputValue: ''
  };

  /**
   * hadle event for enumeration add button
   * */
  handleClick() {
    const { inputValue } = this.state;
    const { onChange } = this.props;
    if (inputValue.trim() !== '') {
      onChange(inputValue);
      this.setState({ inputValue: '' })
    }

  }

  render() {
    const { name, placeholder, className } = this.props;
    const { inputValue } = this.state;
    return (
      <div className={`attributeFieldContainer ${className ? className : ''}`}>
        <label>{name}:</label>
        <div className="inputButtonContainer">
          <TextField
            id={name}
            name={name}
            hintText={placeholder}
            hintStyle={{ paddingLeft: 10, paddingRight: 10 }}
            className="asd"
            value={inputValue}
            onChange={(e, inputValue) => this.setState({ inputValue })}
          />
          <RaisedButton label="add" primary onClick={this.handleClick.bind(this)}/>
        </div>
      </div>
    );
  }
}
