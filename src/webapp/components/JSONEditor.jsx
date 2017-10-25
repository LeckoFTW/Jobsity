/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import React, {Component} from 'react';
import JSONEditorr from 'jsoneditor';
import {connect} from 'react-redux';


@connect(({attributes}) => ({attributes}))
export default class JSONEditor extends Component{
    state = {
        editor : null
    };


    componentDidMount(){
        let container = document.getElementById("jsoneditor");
        let options = {mode: 'code'};
        this.setState({
            editor : new JSONEditorr(container, options)
        });
    }

    componentDidUpdate(){
        const {attributes} = this.props;
        const {editor} = this.state;
        editor.set(attributes);
    }

    render(){
        return(
            <div>
                <div id="jsoneditor" style={{width : '100%', height : 700}}></div>
            </div>
        );
    }
}