import {OPEN_MARKDOWN_PREVIEW, CLOSE_MARKDOWN_PREVIEW} from '../action/preview-action';

const INITIAL_STATE = {
  markdown: {
    text: '',
    visible: false,
    path: '',
  },
};

const markdown = (state, action) => {
  switch (action.type) {
    case OPEN_MARKDOWN_PREVIEW:
      return {
        ...state,
        text: action.text,
        path: action.path,
        visible: true,
      };
    case CLOSE_MARKDOWN_PREVIEW:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};

const preview = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLOSE_MARKDOWN_PREVIEW:
    case OPEN_MARKDOWN_PREVIEW:
      return {
        ...state,
        markdown: markdown(state.markdown, action),
      };
    default:
      return state;
  }
};

export default preview;
