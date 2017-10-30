/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration */
import {
  SET_TABS_VALID,
  SET_TABS_INVALID
} from './types';

/**
 * Action creator that sets the global form validity
 * @param {String} id - Attibute id
 * @param {Boolean} valid - validity of attribute form
 * */
export function setTabsValid(id, valid) {
    return dispatch => {
        if (valid) {
            dispatch({type: SET_TABS_VALID, payload : id});
        } else {
            dispatch({type: SET_TABS_INVALID, payload: id});
        }
    }
}
