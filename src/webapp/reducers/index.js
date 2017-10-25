/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {combineReducers} from 'redux';
import miscReducer from './miscReducer';
import attributesReducer from './attributesReducer';
import tabsValidationReducer from './tabsValidationReducer';

export default combineReducers({
    misc : miscReducer,
    attributes : attributesReducer,
    validTabs : tabsValidationReducer
});