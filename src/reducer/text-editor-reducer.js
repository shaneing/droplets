import {
  OPEN_TEXT_EDITOR,
  CLOSE_TEXT_EDITOR,
  UPDATE_TEXT_EDITOR_CONTENT,
} from '../action/text-editor-action';

const INITIAL_STATE = {
  content: '',
  visible: false,
  path: '',
};

const editor = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_TEXT_EDITOR:
      return {
        ...state,
        visible: true,
        path: action.path,
        content: action.content,
      };
    case CLOSE_TEXT_EDITOR:
      return {
        ...state,
        visible: false,
        content: '',
        path: '',
      };
    case UPDATE_TEXT_EDITOR_CONTENT:
      return {
        ...state,
        content: action.content,
      };
    default:
      return state;
  }
};

export default editor;
