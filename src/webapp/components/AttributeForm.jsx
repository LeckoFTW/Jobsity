/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, { Component } from 'react';
/* Material design */
import { Dialog, RaisedButton } from 'material-ui';
/* Redux */
import { connect } from 'react-redux';
import { changeAttrFieldValue, removeAttribute } from '../actions/attributeActions';
import { setTabsValid } from '../actions/tabsValidationActions';
/* Components */
import Input from './common/AttributeInput';
import AttributeExtraFields from './AttributeExtraFields';
import Select from './common/SelectField';
/* Utils */
import { validateAttribute, isDuplicatedField } from '../utils/validator';
import _ from 'lodash';
/* Styling */
import '../styles/attributeForm.scss';

@connect(({ misc, attributes, attributedEdited: editedAttribute }) => ({
  misc,
  attributes,
  editedAttribute
}), { changeAttrFieldValue, setTabsValid, removeAttribute })
/**
 * Component that show the attribute form and set the validation for all fields
 * */
export default class Attribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracted: true,
      dtObject: false,
      nameValidationError: '',
      minValidationError: '',
      maxValidationError: '',
      rangeValidationError: '',
      precisionValidationError: '',
      accuracyValidationError: '',
      removeDialogOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { attribute: currentAttribute } = this.props;
    const { attributes: nextAttributes } = nextProps;
    this.validateDuplicatedName(currentAttribute, nextAttributes);
  }

  /**
   * determines if the component will be updated.
   * */
  shouldComponentUpdate(nextProps, nextState) {
    const { attribute } = this.props;
    const { editedAttribute } = nextProps;
    const stateChanged = !_.isEqual(nextState, this.state);
    const isEditedAttr = _.isEqual(editedAttribute, attribute._id);
    this.setTabsValidity(stateChanged, isEditedAttr, nextState);
    return isEditedAttr ||
      stateChanged || false;

  }

  /**
   * Show or hide the delete confirmation modal when the user clicks on remove attribute button
   * */
  toggleDialog() {
    this.setState({ removeDialogOpen: !this.state.removeDialogOpen });
  }

  /**
   * Change the attribute state between contracted and expanded
   * */
  expandAttribute() {
    this.setState({ contracted: !this.state.contracted });
  }

  /**
   * Call the action creator for change and attribute field value
   * */
  changeFieldValue(field, value) {
    const { changeAttrFieldValue } = this.props;
    const { attribute } = this.props;
    changeAttrFieldValue(attribute._id, field, value);
    const errors = validateAttribute(attribute);
    this.setState({ ...errors });
  }

  /**
   * Validate the contracted state of the attribute and render the corresponding button
   * */
  toggleExpandAttButton() {
    const { contracted } = this.state;
    if (contracted) return (
      <div className="expandButton">
        <div className="material-icons" onClick={this.expandAttribute.bind(this)}>expand_more</div>
      </div>
    );
    return (
      <div className="expandButton">
        <div className="material-icons" onClick={this.expandAttribute.bind(this)}>expand_less</div>
      </div>
    );
  }

  /**
   * handle the event when user change the attribute datatype select box and validate the new value
   * */
  handleDataTypeChange(e, index, dataType) {
    this.validateObjectType(dataType);
    this.changeFieldValue('dataType', dataType);
  }

  /**
   * handle the event when user change the attribute format select box and validate the new value
   * */
  handleFormatChange(e, index, nextFormat) {
    const { format } = this.props.attribute;
    if (format !== nextFormat) {
      this.setFormatChangedValues(nextFormat);
      this.validateFormatNumber(nextFormat);
    }
  }

  // Utils

  /**
   * Validates if the attribute name already exists in the new attirbutes array
   * */
  validateDuplicatedName(currentAttribute, nextAttributes) {
    if (!_.isEmpty(currentAttribute.name)) {
      const validName = !isDuplicatedField(currentAttribute.name, nextAttributes.map(attribute => attribute.name));
      this.setState({ nameValidationError: validName ? '' : 'Name already exists' });
    }
  }

  /**
   * Validates if component has changes an set the attribute form validity
   * */
  setTabsValidity(stateChanged, isEditedAttr, nextState) {
    const { attribute, setTabsValid } = this.props;
    if (stateChanged || isEditedAttr) {
      setTabsValid(attribute._id, [
        'nameValidationError',
        'minValidationError',
        'maxValidationError',
        'rangeValidationError',
        'precisionValidationError',
        'accuracyValidationError'
      ].every(error => _.isEmpty(nextState[ error ])));
    }
  }

  /**
   * Validates if the new data type is "OBJECT"
   * */
  validateObjectType(dataType) {
    if (dataType === 'OBJECT') {
      this.setState({ dtObject: true });
      this.setTypeObjectValues();
    } else {
      this.setState({ dtObject: false });
    }
  }

  /**
   * Sets the form values corresponding to object type
   * */
  setTypeObjectValues() {
    this.changeFieldValue('defaultValue', '');
    this.changeFieldValue('format', 'NONE');
    this.changeFieldValue([ 'min', 'max', 'unitOfMeasurement', 'precision', 'accuracy' ], null);
    this.changeFieldValue('enumerations', []);
  }

  /**
   * Resets form values when format did change
   * */
  setFormatChangedValues(format) {
    this.changeFieldValue('enumerations', []);
    this.changeFieldValue('format', format);
  }

  /**
   * Validate if the ner format value is Number and sets the corresponding form values.
   * */
  validateFormatNumber(format) {
    if (format === 'NUMBER') {
      this.changeFieldValue([ 'min', 'max', 'unitOfMeasurement', 'precision', 'accuracy' ], '');
    }
    else {
      this.changeFieldValue([ 'min', 'max', 'unitOfMeasurement', 'precision', 'accuracy' ], null);
    }
  }

  render() {
    const { misc, removeAttribute, attribute } = this.props;
    const { contracted, dtObject } = this.state;

    return (
      <section className={`attributeContainer ${contracted ? 'contractedAttribute' : ''}`}>
        {this.toggleExpandAttButton()}
        <div className="removeAttrButton" onClick={() => this.toggleDialog()}>
          <i className="material-icons">delete_forever</i>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Input
              name="Name"
              placeholder="Enter a name"
              onChange={(e, name) => this.changeFieldValue('name', name)}
              value={attribute.name}
              errMessage={this.state.nameValidationError}
            />
          </div>
          <div className="col-md-9">
            <Input
              name="Description"
              placeholder="Enter description for your new attribute"
              onChange={(e, description) => this.changeFieldValue('description', description)}
              value={attribute.description}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Select
              name="Device Resource Type"
              onChange={() => console.log()}
              items={[ { value: 1, text: 'Default Value' } ]}
              placeholder="Default Value"
              disabled
            />
          </div>
          <div className="col-md-8">
            <Input
              name="Default Value"
              placeholder="Enter a default value"
              onChange={(e, defaultValue) => this.changeFieldValue('defaultValue', defaultValue)}
              value={attribute.defaultValue}
              disabled={dtObject}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Select
              name="Data Type"
              onChange={this.handleDataTypeChange.bind(this)}
              items={misc.dataTypes.map(dataType => ({ value: dataType, text: dataType }))}
              placeholder="Default Value"
              value={attribute.dataType}
            />
          </div>
          <div className="col-md-4">
            <Select
              name="Format"
              onChange={this.handleFormatChange.bind(this)}
              items={misc.formats.map(format => ({ value: format, text: format }))}
              placeholder="Default Value"
              value={attribute.format}
              disabled={dtObject}
            />
          </div>
        </div>
        <AttributeExtraFields
          attribute={attribute}
          changeFieldValue={this.changeFieldValue.bind(this)}
          state={this.state}
        />
        <Dialog
          title="Delete Confirmation"
          modal={false}
          actions={<div>
            <RaisedButton
              label="CANCEL"
              secondary
              className="secondaryButton"
              onClick={() => this.toggleDialog()}
            />
            <RaisedButton
              label="DELETE"
              primary
              onClick={() => {
                this.toggleDialog();
                removeAttribute(attribute._id);
              }}
            />
          </div>}
          open={this.state.removeDialogOpen}
        >
          Do you want to remove the selected attribute?
        </Dialog>

      </section>
    );
  }
}
