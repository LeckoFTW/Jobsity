/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {
    FETCH_ATTRIBUTES,
    CHANGE_ATTRIBUTE_FIELD_VALUE,
    ADD_ATTRIBUTE,
    REMOVE_ATTRIBUTE,
} from './types';

import axios from 'axios';
import ObjectId from 'bson-objectid';

export function fetchAttributes() {
    return dispatch => {
        axios.get('http://localhost:3001/api/attributes')
            .then(({data}) => {
                dispatch({
                    type: FETCH_ATTRIBUTES,
                    payload: data
                })
            })
    };
}

export function changeAttrFieldValue(id, field, value) {
    return {
        type: CHANGE_ATTRIBUTE_FIELD_VALUE,
        payload: {
            id,
            field,
            value
        }
    }
}

export function addAttribute(category) {
    return {
        type: ADD_ATTRIBUTE,
        payload: {
            _id: ObjectId().str,
            name: "",
            description: "",
            dataType: "59ee5a5c883b111e02c789e1",
            format: "59ee85e86f8a2224b4676df9",
            category: category,
            extraFields: {
                enumerations: []
            },
            defaultValue: "",
            device: ""
        }

    }
}

export function removeAttribute(id) {
    return {
        type: REMOVE_ATTRIBUTE,
        payload: id
    }
}

export function saveAttributesList(cb) {
    return (dispatch, getState) => {
        const {attributes} = getState();
        axios.post('http://localhost:3001/api/attributes/bulk', attributes)
            .then(() => {
                cb();
            })
            .catch(err => console.log(err));
    }
}