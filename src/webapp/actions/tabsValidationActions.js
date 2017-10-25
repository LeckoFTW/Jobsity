/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {SET_TABS_VALID, SET_TABS_INVALID} from './types';

export function setTabsValid(id, valid) {
    return dispatch => {
        if (valid) {
            dispatch({type: SET_TABS_VALID, payload : id});
        } else {
            dispatch({type: SET_TABS_INVALID, payload: id});
        }
    }
}