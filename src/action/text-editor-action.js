import * as previewActions from './preview-action';
import * as remote from './../remote';
import * as noteActions from './note-action';

export const OPEN_TEXT_EDITOR = 'OPEN_TEXT_EDITOR';
export const CLOSE_TEXT_EDITOR = 'CLOSE_TEXT_EDITOR';
export const UPDATE_TEXT_EDITOR_CONTENT = 'UPDATE_TEXT_EDITOR_CONTENT';
export const SAVE_DATA = 'SAVE_DATA';


export const openTextEditor = (content, path) => ({
  type: OPEN_TEXT_EDITOR,
  content,
  path,
});

export const saveData = (content, path) => {
  remote.droplets.dataStore.writeSync(path, content);
  return {
    type: SAVE_DATA,
  };
};

export const closeTextEditor = () => ({
  type: CLOSE_TEXT_EDITOR,
});

export const openTextEditorAndCloseMarkdownPreview = (content, path) => (dispatch) => {
  const promise = new Promise((resolve) => {
    dispatch(previewActions.closeMarkdownPreview());
    resolve();
  });

  promise.then(() => {
    dispatch(openTextEditor(content, path));
  });
};

export const closeTextEditorAndOpenMarkdownPreview = (content, path) => (dispatch) => {
  const promise = new Promise((resolve) => {
    dispatch(closeTextEditor());
    dispatch(saveData(content, path));
    resolve();
  });

  promise.then(() => {
    dispatch(previewActions.openMarkdownPreview(content, path));
    dispatch(noteActions.updateList(path.substring(0, path.lastIndexOf('/'))));
  });
};

export const updateContent = content => ({
  type: UPDATE_TEXT_EDITOR_CONTENT,
  content,
});

