/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* React */
import React, {Component} from 'react';
/* Components */
import InputFieldWithButton from './common/InputFieldWithButton';
import EnumerationsList from './common/EnumerationsList';
import NumberInput from './common/NumberInput';
import Input from './common/AttributeInput';


/**
 * Component that render format:NONE enumerations or format:NUMBER fields
 * */
export default class AttributeExtraFields extends Component{

  handleEnumerationInputChange(enumeration){
    const {attribute : {enumerations}, changeFieldValue} = this.props;
    const nextEnumerations = [
      ...enumerations, enumeration
    ];
    changeFieldValue('enumerations', nextEnumerations);
  }

  handleDeleteEnumeration(selectedEnum){
    const {attribute : {enumerations}, changeFieldValue} = this.props;
    const nextEnumerations = enumerations.filter(enumeration => enumeration !== selectedEnum);
    changeFieldValue('enumerations', nextEnumerations);
  }

  renderFormatNone(enumerations) {
    return (
      <div className="row">
        <div className="col-md-6">
          <InputFieldWithButton
            name="Enumerations"
            placeholder="Enter value"
            onChange={this.handleEnumerationInputChange.bind(this)}
            className="attDescription"
          />
        </div>
        <div className="col-md-6">
          <EnumerationsList
            name="Values"
            enumerations={enumerations}
            onDeleteEnum={this.handleDeleteEnumeration.bind(this)}
          />
        </div>
      </div>
    );
  }

  renderFormatNumber(min, max, unitOfMeasurement, precision, accuracy, changeFieldValue, state) {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <NumberInput
              name="Range"
              placeholder="Range Min"
              onChange={(e, min) => changeFieldValue('min', min)}
              value={min}
              required
              errMessage={state.minValidationError || state.rangeValidationError}
            />
          </div>
          <div className="col-md-6">
            <NumberInput
              placeholder="Range Max"
              onChange={(e, max) => changeFieldValue('max', max)}
              value={max}
              required
              errMessage={state.maxValidationError || state.rangeValidationError}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Input
              name="Unit of Measurement"
              placeholder="UoM (eg. mm)"
              onChange={(e, unitOfMeasurement) => changeFieldValue('unitOfMeasurement', unitOfMeasurement)}
              value={unitOfMeasurement}
            />
          </div>
          <div className="col-md-4">
            <NumberInput
              name="Precision"
              placeholder="Precision (eg. 0.5)"
              onChange={(e, precision) => changeFieldValue('precision', precision)}
              value={precision}
              required
              errMessage={state.precisionValidationError}
            />
          </div>
          <div className="col-md-4">
            <NumberInput
              name="Accuracy"
              placeholder="Accuracy (eg. 0.5)"
              onChange={(e, accuracy) => changeFieldValue('accuracy', accuracy)}
              value={accuracy}
              required
              errMessage={state.accuracyValidationError}
            />
          </div>
        </div>
      </div>
    );
  }


  render(){
    const { attribute : {
      dataType,
      format,
      enumerations,
      min,
      max,
      unitOfMeasurement,
      precision,
      accuracy
    }, changeFieldValue, state } = this.props;
    if (dataType === 'STRING') {
      if (format === 'NONE') {
        return this.renderFormatNone(enumerations);
      }
      else if (format === 'NUMBER') {
        return this.renderFormatNumber(min, max, unitOfMeasurement, precision, accuracy, changeFieldValue, state);
      }
      return null;
    }
    return null;
  }
}
