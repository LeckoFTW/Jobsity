/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {
    FETCH_ATTRIBUTES,
    CHANGE_ATTRIBUTE_FIELD_VALUE,
    ADD_ATTRIBUTE,
    REMOVE_ATTRIBUTE
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type){
        case FETCH_ATTRIBUTES :
            return action.payload;
        case CHANGE_ATTRIBUTE_FIELD_VALUE:
            const {id, field, value} = action.payload;
            let newState = state.map(attr => {
                if(attr._id === id) attr[field] = value;
               return attr;
            });
            return newState;
        case ADD_ATTRIBUTE :
            let a = [...state, action.payload];
            return a;
        case REMOVE_ATTRIBUTE:
            return state.filter(attr => attr._id !== action.payload);
        default :
            return state;
    }
}
