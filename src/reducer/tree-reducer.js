import {
  SELECT_NODE,
  ADD_CHILD,
  CREATE_NODE,
  REMOVE_CHILD,
  DELETE_NODE,
  EXPAND_NODE,
  COLLAPSE_NODE,
  ADD_COUNT,
  UPDATE_COUNT,
  RENAME_NODE,
} from '../action/tree-action';
import * as remote from '../remote';

const INITIAL_STATE = remote.droplets.tree.generateTree();

/**
 * state {
 *  id,
 *  path,
 *  name.
 *  selected,
 *  isRoot,
 *  childIds,
 *  count,
 *  totalCount,
 *  expanded
 * }
 */

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [
        ...state,
        action.childId,
      ];
    case REMOVE_CHILD:
      return state.filter(childId => `${childId}` !== action.childId);
    default:
      return state;
  }
};


const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.id,
        path: action.path,
        name: action.name,
        selected: false,
        isRoot: false,
        expanded: false,
        totalCount: 0,
        count: 0,
        childIds: [],
      };
    case RENAME_NODE:
      return {
        ...state,
        name: action.name,
      };
    case REMOVE_CHILD:
    case ADD_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action),
      };
    case SELECT_NODE:
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
    case EXPAND_NODE:
      return {
        ...state,
        expanded: true,
      };
    case COLLAPSE_NODE:
      return {
        ...state,
        expanded: false,
      };
    default:
      return state;
  }
};

const tree = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        ...state,
        [action.id]: node(state[action.id], action),
      };
    case ADD_CHILD:
      return {
        ...state,
        [action.id]: node(state[action.id], action),
      };
    case SELECT_NODE:
      state = {...state};
      Object.keys(state).forEach((id) => {
        state[id] = node(state[id], action);
      });
      return state;
    case RENAME_NODE:
      return {
        ...state,
        [action.id]: node(state[action.id], action),
      };
    case DELETE_NODE:
      state = Object.keys(state)
      .filter(key => key !== action.id)
      .reduce((result, current) => {
        result[current] = state[current];
        return result;
      }, {});
      return state;
    case REMOVE_CHILD:
      return {
        ...state,
        [action.id]: node(state[action.id], action),
      };
    case EXPAND_NODE:
    case COLLAPSE_NODE:
      return {
        ...state,
        [action.id]: node(state[action.id], action),
      };
    case ADD_COUNT:
      return remote.droplets.tree.addCount(state, action.path, 1);
    case UPDATE_COUNT:
      return remote.droplets.tree.refreshCount(state);
    default:
      return state;
  }
};

export default tree;
