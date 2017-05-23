import {ADD_NOTE_COUNT, DECREASE_NOTE_COUNT} from '../action/user-action';

const INITIAL_STATE = {
  notes: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NOTE_COUNT:
      return {
        ...state,
        notes: state.notes + action.count,
      };
    case DECREASE_NOTE_COUNT:
      return {
        ...state,
        notes: state.notes - action.count,
      };
    default:
      return state;
  }
}

