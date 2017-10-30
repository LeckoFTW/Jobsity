/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, {Component} from 'react';
/* Material design */
import {Dialog, RaisedButton} from 'material-ui';
/* Redux */
import {connect} from 'react-redux';
import {changeAttrFieldValue, removeAttribute} from '../actions/attributeActions';
import {setTabsValid} from '../actions/tabsValidationActions';
/* Components */
import Input from './commons/AttributeInput';
import AttributeExtraFields from './AttributeExtraFields';
import Select from './commons/SelectField';
/* Utils */
import formValidator from '../utils/attributeFormValidator';
/* Styling */
import '../styles/attributeForm.scss';

@connect(({misc, attributes}) => ({misc, attributes}), {changeAttrFieldValue, setTabsValid, removeAttribute})
/**
 * Component that show the attribute form and set the validation for all fields
 * */
export default class Attribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracted: true,
      dtObject: false,
      attribute: props.attributes.find(a => a._id === props.attribute),
      nameValidationError: '',
      rangeValidationError: '',
      precisionValidationError: '',
      accuracyValidationError: '',
      removeDialogOpen: false
    };
  }

  /**
   * Show or hide the delete confirmation modal when the user clicks on remove attribute button
   * */
  toggleDialog() {
    this.setState({removeDialogOpen: !this.state.removeDialogOpen});
  }

  /**
   * Change the attribute state between contracted and expanded
   * */
  expandAttribute() {
    this.setState({contracted: !this.state.contracted});
  }

  /**
   * Call the action creator for change and attribute field value
   * */
  changeFieldValue(field, value) {
    const {changeAttrFieldValue} = this.props;
    changeAttrFieldValue(this.state.attribute._id, field, value);
  }

  /**
   * Validate the contracted state of the attribute and render the corresponding button
   * */
  toggleExpandAttButton() {
    const {contracted} = this.state;
    if (contracted) return (
      <div className="expandButton">
        <div className="material-icons" onClick={this.expandAttribute.bind(this)}>expand_more</div>
      </div>
    );
    else return (
      <div className="expandButton">
        <div className="material-icons" onClick={this.expandAttribute.bind(this)}>expand_less</div>
      </div>
    );
  }

  /**
   * react hook that validate the attribute form values to activate or deactivare global save button
   * and if the form has error then show them in the form
   * */
  componentWillReceiveProps(nextProps) {
    const {attributes, setTabsValid} = nextProps;
    const {attribute} = this.state;
    this.setState({
      nameValidationError: '',
      rangeValidationError: '',
      precisionValidationError: '',
      accuracyValidationError: ''
    });
    formValidator(attribute, attributes)
      .then(setTabsValid(attribute._id, true))
      .catch(errors => {
        this.setState({...errors});
        setTabsValid(attribute._id, false);
      });

  }

  /**
   * handle the event when user change the attribute datatype select box and validate the new value
   * */
  handleDataTypeChange(e, index, dataType) {
    if (dataType === 'OBJECT') {
      this.setState({dtObject: true});
      this.changeFieldValue('defaultValue', '');
      this.changeFieldValue('format', 'NONE');
      this.changeFieldValue(['min', 'max', 'unitOfMeasurement', 'precision', 'accuracy'], null);
      this.changeFieldValue('enumerations', []);

    } else {
      this.setState({dtObject: false});
    }
    this.changeFieldValue('dataType', dataType);
  }

  /**
   * handle the event when user change the attribute format select box and validate the new value
   * */
  handleFormatChange(e, index, format) {
    if (this.state.attribute.format !== format) {
      if (format === 'NUMBER') {
        this.changeFieldValue(['min', 'max', 'unitOfMeasurement', 'precision', 'accuracy'], '');
      }
      else {
        this.changeFieldValue(['min', 'max', 'unitOfMeasurement', 'precision', 'accuracy'], null);
      }
      this.changeFieldValue('enumerations', []);
      this.changeFieldValue('format', format);
    }
  }

  render() {
    const {misc, removeAttribute} = this.props;
    const {contracted, dtObject, attribute} = this.state;

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
              required
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
              items={[{value: 1, text: 'Default Value'}]}
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
              items={misc.dataTypes.map(d => ({value: d, text: d}))}
              placeholder="Default Value"
              value={attribute.dataType}
            />
          </div>
          <div className="col-md-4">
            <Select
              name="Format"
              onChange={this.handleFormatChange.bind(this)}
              items={misc.formats.map(f => ({value: f, text: f}))}
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
