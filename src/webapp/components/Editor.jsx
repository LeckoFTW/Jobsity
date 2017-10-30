/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, {Component} from 'react';
/* Redux */
import {connect} from 'react-redux';
/* Editor library*/
import JSONEditor from 'jsoneditor';
/* Styling */
import '../styles/editor.scss';

@connect(({misc, attributes}) => ({misc, attributes}))
/**
 * Component that render a jsoneditor box and display the internal object that manages the
 * attributes list
 * */
export default class Editor extends Component {
  state = {
    editor: null
  };

  /**
   * react hook that initializes the editor box
   * */
  componentDidMount() {
    const container = document.getElementById("jsoneditor");
    const options = {mode: 'code'};
    this.setState({
      editor: new JSONEditor(container, options)
    });
  }

  /**
   * react hook that updates the editor box content
   * */
  componentDidUpdate() {
    const {attributes} = this.props;
    const {editor} = this.state;
    editor.set(attributes);
  }

  render() {
    return (
      <div id="jsoneditor"></div>
    );
  }
}
