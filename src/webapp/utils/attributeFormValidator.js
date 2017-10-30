/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/**
 * Helper function that validate an attribute form data
 * @param {Object} attribute - Attribute fields
 * @param {Array} attributes - Application attribues list
 * */
export default function (attribute, attributes) {
  return new Promise((resolve, reject) => {
    let isValid = true;
    let errors = {};
    const {min, max, precision, accuracy} = attribute;
    if (attribute.name === '') {
      isValid = false;
    } else {
      const sameAttr = attributes.filter(a => a.name.toLowerCase() === attribute.name.toLowerCase());
      if (sameAttr.length > 1) {
        isValid = false;
        errors.nameValidationError = 'Name must be unique';
      }
    }
    if (attribute.format === 'NUMBER' && attribute.dataType === 'STRING') {
      if (!(typeof min === 'number' && typeof max === 'number')) {
        isValid = false;
      } else {
        if (min > max) {
          isValid = false;
          errors.rangeValidationError = 'Min must be lower than max';
        } else {
          if (typeof precision !== 'number') {
            isValid = false;
          } else if ((max - min) % precision !== 0) {
            isValid = false;
            errors.precisionValidationError = 'Invalid Precision';
          }

          if (typeof accuracy !== 'number') {
            isValid = false;
          } else if ((max - min) % accuracy !== 0) {
            isValid = false;
            errors.accuracyValidationError = 'Invalid Accuracy';
          }
        }
      }
    }
    if (isValid) {
      resolve();
    } else {
      reject(errors);
    }
  });


}
