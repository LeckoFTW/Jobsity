/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {FECTH_DATATYPES, FETCH_CATEGORIES, FETCH_FORMATS} from '../actions/types';

let defaultState = {
    dataTypes : [],
    categories : [],
    formats : []
};

export default function (state = defaultState, action) {
    switch (action.type){
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