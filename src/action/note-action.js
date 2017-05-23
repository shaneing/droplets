import * as remote from '../remote';
import * as textEditorAction from './text-editor-action';
import * as treeAction from './tree-action';

export const SELECT_NOTE = 'SELECT_NOTE';
export const LIST_NOTE = 'LIST_NOTE';
export const LIST_SEARCH_NOTE = 'LIST_SEARCH_NOTE';
export const UPDATE_STATUS_NOTE = 'UPDATE_STATUS_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

const normalDate = (date) => {
  if (!date) {
    return new Date().setYear(1970);
  }
  return new Date(date);
};

const sortByDate = (a, b) =>
  // eslint-disable-next-line no-nested-ternary
  (normalDate(a.date) > normalDate(b.date) ? -1 : normalDate(a.date) < normalDate(b.date) ? 1 : 0);

export const selectNote = id => ({
  type: SELECT_NOTE,
  id,
});

export const deleteNote = (id, path) => (dispatch) => {
  remote.droplets.dataStore.rmSync(path);
  dispatch(textEditorAction.closeTextEditor());
  dispatch({
    type: DELETE_NOTE,
    id,
    path,
  });
};

export const selectNoteAndOpenPreview = (id, path, openMarkdownPreviewAction) => (dispatch) => {
  dispatch(selectNote(id));
  const promise = new Promise((resolve) => {
    const text = remote.droplets.dataStore.read(path);
    resolve(text);
  });

  promise.then((text) => {
    dispatch(textEditorAction.closeTextEditor());
    dispatch(openMarkdownPreviewAction(text, path));
  }).catch((error) => {
    remote.droplets.logger.error(`Note action clickNote - ${error}`);
  });
};

export const listNotes = (notes, selected) => {
  notes.sort(sortByDate);
  if (selected) {
    notes[0].selected = true;
  }
  return {
    type: LIST_NOTE,
    notes,
  };
};

export const searchNote = (keyword = '') => (dispatch) => {
  remote.droplets.note.search({
    searchPath: 'Note',
    keyword,
  }).then((notes) => {
    dispatch(listNotes(notes));
  }).catch((error) => {
    if (error) {
      dispatch(listNotes([]));
    }
  });
};

const readNote = path => new Promise((resolve) => {
  const text = remote.droplets.dataStore.read(path);
  resolve(text);
});

// const updateStatus = (id, status) => ({
//   type: UPDATE_STATUS_NOTE,
//   id,
//   status,
// });


export const createNote = (path, title) => (dispatch) => {
  remote.droplets.note.createNote(path, title)
  .then(() => {
    remote.droplets.note.listNotes(path)
    .then((notes) => {
      dispatch(treeAction.addCount(path));
      dispatch(listNotes(notes, true));
      const openedNote = notes[0];
      readNote(openedNote.path).then((content) => {
        dispatch(textEditorAction.closeTextEditor());
        dispatch(
          textEditorAction.openTextEditorAndCloseMarkdownPreview(content, openedNote.path),
        );
        // remote.droplets.api.note.create({
        //   title: openedNote.title,
        //   path: openedNote.path,
        //   date: openedNote.date,
        //   tags: openedNote.tags,
        //   author: openedNote.author,
        //   content,
        //   callback: (err, res) => {
        //     const body = res.body;
        //     if (!err) {
        //       remote.droplets.note.persist({
        //         version: body.version,
        //         path: openedNote.path,
        //         status: constants.NOTE_STATUS.DONE,
        //       });
        //       dispatch(updateStatus(0, constants.NOTE_STATUS.DONE));
        //     }
        //   },
        // });
      }).catch((error) => {
        remote.droplets.logger.error(`Note action createNote - ${error}`);
      });
    }).catch((err) => {
      if (err) {
        dispatch(listNotes([]));
      }
    });
  });
};
