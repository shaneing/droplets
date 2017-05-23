import { connect } from 'react-redux';

import Tree from './tree';
import * as actions from '../../../action/tree-action';
import * as noteActions from '../../../action/note-action';

const mapStateToProps = state => ({
  nodes: state.tree,
});

const mapDispatchToProps = {
  onNodeClick: actions.selectNodeAndListNotes,
  removeChild: actions.removeChild,
  addChild: actions.addChild,
  createNode: actions.createNode,
  deleteNode: actions.deleteNode,
  onNodeSelect: actions.selectNode,
  createNote: noteActions.createNote,
  renameNode: actions.renameNode,
  expand: actions.expandNode,
  collapse: actions.collapseNode,
};

const TreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tree);

export default TreeContainer;
