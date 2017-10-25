/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Attribute from './Attribute';
import {addAttribute} from '../actions/attributeActions';

@connect(({attributes}) => ({attributes}), {addAttribute})
export default class CategoryTab extends Component {
    render() {
        const {attributes, category, addAttribute} = this.props;
        return (
            <div>
                <div className="attributeSection">
                    <div className="categoryDesc">
                        {category.description}
                    </div>
                    {attributes.filter(attr => attr.category === category._id).map(attr => (
                        <Attribute key={attr._id} attribute={attr._id}/>
                    ))}

                </div>
                <div className="categoryFooter">
                    <div className="addAttr" onClick={()=> addAttribute(category._id)}>
                        <i className="material-icons">add_circle</i>
                        Add Attribute
                    </div>
                </div>
            </div>

        );
    }
}