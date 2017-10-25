/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import {
    FETCH_ATTRIBUTES,
    CHANGE_ATTRIBUTE_FIELD_VALUE,
    ADD_ATTRIBUTE
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
            return [...state, action.payload];
        default :
            return state;
    }
}
