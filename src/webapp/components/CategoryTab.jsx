/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, { Component } from 'react';
/* Redux */
import { connect } from 'react-redux';
import { addAttribute } from '../actions/attributeActions';
/* Components */
import Attribute from './AttributeForm';
/* Styling */
import '../styles/categoryTab.scss';

@connect(({ attributes }, ownProps) => ({ attributes: attributes.filter(attr => attr.category === ownProps.category) }), { addAttribute })
/**
 * Component that render the displaying category content
 * */
export default class CategoryTab extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.attributes.length !== nextProps.attributes.length;
  }

  render() {
    const { attributes, category, addAttribute } = this.props;
    return (
      <div className="categorySection">
        <div className="categoryAttributes">
          {attributes.map(attr => (
            <Attribute key={attr._id} attribute={attr}/>
          ))}
        </div>
        <div className="categoryFooter">
          <div className="addAttr" onClick={() => addAttribute(category)}>
            <i className="material-icons">add_circle</i>
            Add Attribute
          </div>
        </div>
      </div>
    );
  }
}
