import * as remote from '../remote';

import { listNotes } from './note-action';

export const SELECT_NODE = 'SELECT_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const CREATE_NODE = 'CREATE_NODE';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const DELETE_NODE = 'DELETE_NODE';
export const EXPAND_NODE = 'EXPAND_NODE';
export const COLLAPSE_NODE = 'COLLAPSE_NODE';
export const ADD_COUNT = 'ADD_COUNT';
export const UPDATE_COUNT = 'UPDATE_COUNT';
export const RENAME_NODE = 'RENAME_NODE';


export const addCount = path => ({
  type: ADD_COUNT,
  path,
});

export const updateCount = path => ({
  type: UPDATE_COUNT,
  path,
});

export const selectNode = id => ({
  type: SELECT_NODE,
  id,
});

export const selectNodeAndListNotes = (id, path) => (dispatch) => {
  dispatch(selectNode(id));
  remote.droplets.note.listNotes(path).then((notes) => {
    dispatch(listNotes(notes));
  }).catch((error) => {
    if (error) {
      dispatch(listNotes([]));
    }
  });
};

export const removeChild = (id, childId) => ({
  type: REMOVE_CHILD,
  id,
  childId,
});

export const renameNode = (id, name, path) => {
  const newPath = path.substring(
      0,
      path.lastIndexOf('/') + 1,
    ) + name;
  remote.droplets.dataStore.rename(path, newPath);
  return {
    type: RENAME_NODE,
    id,
    name,
  };
};

export const deleteNode = (id, path) => (dispatch) => {
  remote.droplets.dataStore.rmdirRecursive(path).then(() => {
    dispatch(updateCount(path));
    dispatch(listNotes([]));
    dispatch({
      type: DELETE_NODE,
      id,
    });
  });
};

let newId = 0;
export const createNode = (path, name) => {
  newId += 1;
  return {
    type: CREATE_NODE,
    id: `new-${newId}`,
    path,
    name,
  };
};

export const addChild = (id, childId) => ({
  type: ADD_CHILD,
  id,
  childId,
});


export const expandNode = id => ({
  type: EXPAND_NODE,
  id,
});

export const collapseNode = id => ({
  type: COLLAPSE_NODE,
  id,
});

