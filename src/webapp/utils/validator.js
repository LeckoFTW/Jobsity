/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';
import _ from 'lodash';

/**
 * Helper function that validate an attribute form data
 * @param {Object} attribute - Attribute fields
 * */
export function validateAttribute(attribute) {
  let errors = {
    nameValidationError: '',
    minValidationError: '',
    maxValidationError: '',
    rangeValidationError: '',
    precisionValidationError: '',
    accuracyValidationError: ''
  };
  const { name, min, max, precision, accuracy } = attribute;
  errors.nameValidationError = requiredValidator(name);
  if (attribute.format === 'NUMBER' && attribute.dataType === 'STRING') {
    errors.minValidationError = numberValidator(min);
    errors.maxValidationError = numberValidator(max);
    errors.rangeValidationError = rangeValidator(min, max);
    if (_.isEmpty(errors.minValidationError) && _.isEmpty(errors.maxValidationError) && _.isEmpty(errors.rangeValidationError)) {
      errors.precisionValidationError = rangeModValidator(min, max, precision, 'Precision');
      errors.accuracyValidationError = rangeModValidator(min, max, accuracy, 'Accuracy');
    }
  }

  return errors;
}


export function requiredValidator(value) {
  return !_.isNull(value) && _.isEmpty(value.trim()) && 'This field is required' || '';
}

export function numberValidator(value) {
  return (!_.isNumber(value) && requiredValidator(value)) || (!_.isNumber(value) && 'This field must have only numbers') || ''
}

export function rangeValidator(min, max) {
  return ((_.isNumber(min) && _.isNumber(max)) && _.lt(max, min) && 'Min value must be lower than max') || '';
}

export function rangeModValidator(min, max, value, fieldName) {
  return numberValidator(value) || (((max - min) % value !== 0) && `Invalid ${fieldName}`) || '';
}

export function isDuplicatedField(field, array) {
  return array.filter(item => item.toLowerCase() === field.toLowerCase()).length > 1;
}

export function isNumberFormat(value) {
  return value.match(/^\d+(\.+\d{1,})?$/);
}

