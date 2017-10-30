/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration */
/* Action types */
import {
  FECTH_DATATYPES,
  FETCH_CATEGORIES,
  FETCH_FORMATS
} from '../actions/types';

/**
 * Exports an array that contains the miscellanious data for the application
 * */
export default function (state = [], action) {
  switch (action.type) {
    case FECTH_DATATYPES:
      return {...state, dataTypes: action.payload};
    case FETCH_CATEGORIES:
      return {...state, categories: action.payload};
    case FETCH_FORMATS :
      return {...state, formats: action.payload};
    default :
      return state;
  }
}
