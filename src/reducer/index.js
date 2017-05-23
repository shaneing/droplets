import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import treeReducer from './tree-reducer';
import userReducer from './user-reducer';
import noteReducer from './note-reducer';
import textEditorReducer from './text-editor-reducer';
import autoReducer from './auto-complete-reducer';
import previewReducer from './preview-reducer';

export const userLevelReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  note: noteReducer,
  editor: textEditorReducer,
  tree: treeReducer,
  auto: autoReducer,
  preview: previewReducer,
});

export const baseReduce = combineReducers({
  form: formReducer,
});

export const visitorLevelReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  note: noteReducer,
  editor: textEditorReducer,
  tree: treeReducer,
  auto: autoReducer,
  preview: previewReducer,
});

