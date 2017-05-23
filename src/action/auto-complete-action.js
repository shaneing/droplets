export const GET_MATCHED_KEYWORDS_FOR_NOTE_SEARCH_AUTO = 'GET_MATCHED_KEYWORDS_FOR_NOTE_SEARCH_AUTO';
export const SAVE_KEYWORD_FOR_NOTE_SEARCH_AUTO = 'SAVE_KEYWORD_FOR_NOTE_SEARCH_AUTO';

export const getMatchedKeywordsForNoteSearchAuto = keyword => ({
  type: GET_MATCHED_KEYWORDS_FOR_NOTE_SEARCH_AUTO,
  keyword,
});

export const saveKeywordForNoteSearchAuto = keyword => ({
  type: SAVE_KEYWORD_FOR_NOTE_SEARCH_AUTO,
  keyword,
});
