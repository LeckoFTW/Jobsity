/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration*/
/* Reducers */
import { combineReducers } from 'redux';
import miscReducer from './miscReducer';
import attributesReducer from './attributesReducer';
import tabsValidationReducer from './tabsValidationReducer';
import attributeEditedReducer from './attributeEditedReducer';

/**
 * @return {Object} - appReducers
 * */
export default combineReducers({
  misc: miscReducer,
  attributes: attributesReducer,
  validTabs: tabsValidationReducer,
  attributedEdited: attributeEditedReducer
});
