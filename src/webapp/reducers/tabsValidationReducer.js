/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {SET_TABS_INVALID, SET_TABS_VALID} from '../actions/types';

export default function (state = true, action) {
    switch (action.type){
        case SET_TABS_VALID :
            return true;
        case SET_TABS_INVALID:
            return false;
        default:
            return state;
    }
}