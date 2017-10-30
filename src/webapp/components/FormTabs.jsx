/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, {Component} from 'react';
/* Redux */
import {connect} from 'react-redux';
/* Materail design*/
import {Tabs, Tab, RaisedButton} from 'material-ui';
/* Components */
import CategoryTab from './CategoryTab';
/* Utils */
import _ from 'lodash';
/* Styling */
import '../styles/tabs.scss';

@connect(({misc, validTabs}) => ({misc, validTabs}))
/**
 * Component that renders the categories main box
 * */
export default class FormTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedDataConfirmation: false
    }
  }

  /**
   * Helper function that divide the attributes list into categories
   * and renders them
   * */
  renderCategories() {
    const {misc: {categories}} = this.props;
    if (categories.length) {
      return categories.map(category => {
        return (
          <Tab label={category._id} key={category._id}>
            <CategoryTab category={category}/>
          </Tab>
        )
      });
    }
  }

  render() {
    const {validTabs} = this.props;
    const valid = _.values(validTabs).every(i => i);
    return (
      <div id="tabsContainer">
        <Tabs className="tabsContent">
          {this.renderCategories()}
        </Tabs>
        <div className="buttonsContainer">
          <RaisedButton
            label="CANCEL"
            secondary
            className="secondaryButton"
          />
          <RaisedButton
            label="SAVE"
            primary
            disabled={!valid}
            onClick={() => console.log('save')}
          />
        </div>
      </div>
    )
  }
}

