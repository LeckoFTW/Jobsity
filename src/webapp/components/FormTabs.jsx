import React, {Component} from 'react';
import {Tabs, Tab, RaisedButton} from 'material-ui';
import CategoryTab from './CategoryTab';
import {connect} from 'react-redux';
import {fetchDataTypes, fetchCategories, fetchFormats} from '../actions/miscActions';
import {fetchAttributes} from '../actions/attributeActions';

@connect(({misc,validTabs}) => ({misc,validTabs}), {fetchDataTypes, fetchAttributes, fetchCategories, fetchFormats})
export default class FormTabs extends Component {

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
        const {validTabs} = this.props;
        return (
            <div>
                <Tabs>
                    {this.renderCategories()}
                </Tabs>
                    <div className="buttonsContainer">
                        <RaisedButton label="CANCEL" secondary style={{marginRight : 10}}/>
                        <RaisedButton label="SAVE" primary disabled={!validTabs}/>
                    </div>
            </div>
        )
    }
}

