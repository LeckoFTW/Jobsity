/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies delclaration */
/* Action types */
import {
  CHANGE_ATTRIBUTE_FIELD_VALUE,
  ADD_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
} from './types';
/* Utils */
import ObjectId from 'bson-objectid';


/**
 * Action creator that change a attribute field value
 * @param {String} id - attribute id
 * @param {String} field - attribute field name
 * @param value - new field value
 * */
export function changeAttrFieldValue(id, field, value) {
  return {
    type: CHANGE_ATTRIBUTE_FIELD_VALUE,
    payload: {
      id,
      field,
      value
    }
  }
}

/**
 * Action creator that creates a new attribute in attributes list
 * @param {String} category - Category name
 * */
export function addAttribute(category) {
  return {
    type: ADD_ATTRIBUTE,
    payload: {
      _id: ObjectId().str,
      name: "",
      description: "",
      dataType: "STRING",
      format: "NONE",
      category: category,
      enumerations: [],
      min: null,
      max: null,
      unitOfMeasurement: null,
      precision: null,
      accuracy: null,
      defaultValue: "",
      device: ""
    }
  }
}

/**
 * Action creator that removes an attribute from attributes list
 * @param {String} id - Attribute id
 * */
export function removeAttribute(id) {
  return {
    type: REMOVE_ATTRIBUTE,
    payload: id
  }
}
