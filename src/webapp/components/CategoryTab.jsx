/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, {Component} from 'react';
/* Redux */
import {connect} from 'react-redux';
import {addAttribute} from '../actions/attributeActions';
/* Components */
import Attribute from './AttributeForm';
/* Styling */
import '../styles/categoryTab.scss';

@connect(({attributes}) => ({attributes}), {addAttribute})
/**
 * Component that render the displaying category content
 * */
export default class CategoryTab extends Component {
  render() {
    const {attributes, category, addAttribute} = this.props;
    return (
      <div className="categorySection">
        <div className="categoryDesc">
          {category.description}
        </div>
        <div className="categoryAttributes">
          {attributes.filter(attr => attr.category === category._id).map(attr => (
            <Attribute key={attr._id} attribute={attr._id}/>
          ))}
        </div>
        <div className="categoryFooter">
          <div className="addAttr" onClick={() => addAttribute(category._id)}>
            <i className="material-icons">add_circle</i>
            Add Attribute
          </div>
        </div>
      </div>
    );
  }
}
