import { CHANGE_ATTRIBUTE_FIELD_VALUE } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case CHANGE_ATTRIBUTE_FIELD_VALUE:
      return action.payload.id;
    default:
      return state;
  }
}
