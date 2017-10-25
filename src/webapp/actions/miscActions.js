/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {FECTH_DATATYPES, FETCH_CATEGORIES, FETCH_FORMATS} from './types';
import axios from 'axios';

export function fetchDataTypes() {
    return dispatch => {
        axios.get('http://localhost:3001/api/datatypes')
            .then(({data}) => {
                dispatch({
                    type : FECTH_DATATYPES,
                    payload : data
                });
            })
    };
}

export function fetchCategories() {
    return dispatch => {
        axios.get('http://localhost:3001/api/categories')
            .then(({data}) => {
                dispatch({
                    type : FETCH_CATEGORIES,
                    payload: data
                });
            })
    }
}

export function fetchFormats(){
    return dispatch => {
        axios.get('http://localhost:3001/api/formats')
            .then(({data}) => {
                dispatch({
                    type : FETCH_FORMATS,
                    payload : data
                });
            })
    };
}