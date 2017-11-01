/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/**
 * Helper function that validate an attribute form data
 * @param {Object} attribute - Attribute fields
 * @param {Array} attributes - Application attributes list
 * */
export function validateAttribute(attribute, attributes) {
  let errors = {};
  const { name, min, max, precision, accuracy } = attribute;

  let validName = !isEmpty(name);
  if (validName)
    errors.nameValidationError = attributes.filter(a => a.name.toLowerCase() === attribute.name.toLowerCase()).length < 2 ? '' : 'Name already exists';

  if (attribute.format === 'NUMBER' && attribute.dataType === 'STRING') {
    if (isNumber(min) && isNumber(max)) {
      if (max > min) {
        errors.rangeValidationError = '';
        const validPrecision = isNumber(precision);
        if (validPrecision)
          errors.precisionValidationError = isRangeMod(min, max, precision) ? '' : 'Invalid Precision';

        const validAccuracy = isNumber(accuracy);
        if (validAccuracy)
          errors.accuracyValidationError = isRangeMod(min, max, accuracy) ? '' : 'Invalid Accuracy';

        return { isValid: (validName && validPrecision && validAccuracy), errors };
      } else {
        errors = {
          ...errors,
          rangeValidationError : 'Min must be lower than max',
          precisionValidationError : '',
          accuracyValidationError : ''
        };

        return { isValid: false, errors };
      }
    } else {
      return { isValid: false, errors };
    }

  } else {
    return { isValid: validName, errors }
  }

}

export function isEmpty(field) {
  return field.trim() === '';
}

export function isNumber(field) {
  return typeof field === 'number';
}

export function isRangeMod(min, max, value) {
  return (max - min) % value === 0;
}

export function isNumberFormat(value){
  return value.match(/^\d+(\.+\d{1,})?$/);
}

