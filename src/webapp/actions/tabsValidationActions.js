/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {SET_TABS_VALID, SET_TABS_INVALID} from './types';

export function setTabsValid(valid) {
    return dispatch => {
        if (valid) {
            dispatch({type: SET_TABS_VALID});
        } else {
            dispatch({type: SET_TABS_INVALID});
        }
    }
}