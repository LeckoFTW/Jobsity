/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import React, {Component} from 'react';
import {Tabs, Tab, RaisedButton} from 'material-ui';
import CategoryTab from './CategoryTab';
import {connect} from 'react-redux';
import {fetchDataTypes, fetchCategories, fetchFormats} from '../actions/miscActions';
import {fetchAttributes, saveAttributesList} from '../actions/attributeActions';
import {Dialog} from 'material-ui';
import _ from 'lodash';

@connect(({misc, validTabs}) => ({misc, validTabs}), {
    fetchDataTypes,
    fetchAttributes,
    fetchCategories,
    fetchFormats,
    saveAttributesList
})
export default class FormTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedDataConfirmation: false
        }
    }

    toggleDialog() {
        this.setState({
            savedDataConfirmation: !this.state.savedDataConfirmation
        });
    }


    componentWillMount() {
        const {fetchDataTypes, fetchAttributes, fetchCategories, fetchFormats} = this.props;
        fetchDataTypes();
        fetchAttributes();
        fetchCategories();
        fetchFormats();
    }


    renderCategories() {
        const {misc: {categories}} = this.props;
        if (categories.length) {
            return categories.map(category => {
                return (
                    <Tab label={category.name} key={category._id}>
                        <CategoryTab category={category}/>
                    </Tab>
                )
            });
        }
    }

    render() {
        const {validTabs, saveAttributesList} = this.props;
        let valid = _.values(validTabs).every(i=>i);
        return (
            <div>
                <Tabs>
                    {this.renderCategories()}
                </Tabs>
                <div className="buttonsContainer">
                    <RaisedButton label="CANCEL" secondary style={{marginRight: 10}}/>
                    <RaisedButton
                        label="SAVE"
                        primary
                        disabled={!valid}
                        onClick={() => saveAttributesList(() => this.toggleDialog())}
                    />
                </div>
                <Dialog
                    actions={
                        <RaisedButton
                            label="OK"
                            primary
                            onClick={() => this.toggleDialog()}
                        />
                    }
                    modal={false}
                    open={this.state.savedDataConfirmation}
                >
                    Attributes list saved!!
                </Dialog>
            </div>
        )
    }
}

