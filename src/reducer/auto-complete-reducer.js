import * as remote from '../remote';
import {
  GET_MATCHED_KEYWORDS_FOR_NOTE_SEARCH_AUTO,
  SAVE_KEYWORD_FOR_NOTE_SEARCH_AUTO,
} from '../action/auto-complete-action';

const droplets = remote.droplets;

const INITIAL_STATE = {
  notes: [],
};

const auto = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MATCHED_KEYWORDS_FOR_NOTE_SEARCH_AUTO:
      state = {
        ...state,
        notes: droplets.auto.getMatchedKeywords({
          key: droplets.auto.CONSTANTS.NOTE_SEARCH_AUTO.key,
          keyword: action.keyword,
        }),
      };
      return state;
    case SAVE_KEYWORD_FOR_NOTE_SEARCH_AUTO:
      droplets.auto.saveKeyword({
        key: droplets.auto.CONSTANTS.NOTE_SEARCH_AUTO.key,
        keyword: action.keyword,
      });
      return state;
    default:
      return state;
  }
};

export default auto;
