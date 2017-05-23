import { SELECT_NOTE, LIST_NOTE, DELETE_NOTE } from '../action/note-action';

const INITIAL_STATE = [];

const note = (state, action) => {
  switch (action.type) {
    case SELECT_NOTE:
      if (state.id !== action.id) {
        return {
          ...state,
          selected: false,
        };
      }
      return {
        ...state,
        selected: true,
      };
    default:
      return state;
  }
};

const notes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_NOTE:
      state = [...state];
      state = state.filter(s => (`${s.id}`) !== action.id);
      return state;
    case SELECT_NOTE:
      return state.map(n => note(n, action));
    case LIST_NOTE:
      state = [...state];
      state = action.notes;
      return state;
    default:
      return state;
  }
};

export default notes;
