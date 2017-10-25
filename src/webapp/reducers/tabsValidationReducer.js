/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {SET_TABS_INVALID, SET_TABS_VALID, REMOVE_ATTRIBUTE, ADD_ATTRIBUTE} from '../actions/types';


const validMap = {};

export default function (state = validMap, action) {
    switch (action.type){
        case SET_TABS_VALID :
            return {...state, [action.payload] : true};
        case SET_TABS_INVALID:
            return {...state, [action.payload] : false};
        case REMOVE_ATTRIBUTE:
            let {[action.payload] : deleted, ...newState} = state;
            return newState;
        case ADD_ATTRIBUTE :
            return {...state, [action.payload._id] : false};
        default:
            return state;
    }
}