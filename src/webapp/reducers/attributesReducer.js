/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration */
/* Action types */
import {
    FETCH_ATTRIBUTES,
    CHANGE_ATTRIBUTE_FIELD_VALUE,
    ADD_ATTRIBUTE,
    REMOVE_ATTRIBUTE
} from '../actions/types';

/**
 * Exports the attributes list array
 * */
export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ATTRIBUTES :
            return action.payload;
        case CHANGE_ATTRIBUTE_FIELD_VALUE:
            const {id, field, value} = action.payload;
            const attribute = state.find(a => a._id === id);
            if(Array.isArray(field)){
                field.forEach(fieldName => attribute[fieldName] = value);
            }else {
                attribute[field] = value;
            }
            return [...state];
        case ADD_ATTRIBUTE :
            const a = [...state, action.payload];
            return a;
        case REMOVE_ATTRIBUTE:
            return state.filter(attr => attr._id !== action.payload);
        default :
            return state;
    }
}
