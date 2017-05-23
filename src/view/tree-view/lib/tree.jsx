import React from 'react';
import PropTypes from 'prop-types';

import * as remote from '../../../remote';
import { Modal } from '../../../component/modal';
import CreateNodeFormContainer from './create-node-form-container';
import CreateNoteFormContainer from './create-note-form-container';
import RenameNodeFormContainer from './rename-node-form-container';

class Tree extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpened: false,
      addNoteModalIsOpened: false,
      renameModalIsOpened: false,
    };
    this.tree = null;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCreateNodeSubmit = this.handleCreateNodeSubmit.bind(this);

    this.openAddNoteModal = this.openAddNoteModal.bind(this);
    this.closeAddNoteModal = this.closeAddNoteModal.bind(this);
    this.handleCreateNoteSubmit = this.handleCreateNoteSubmit.bind(this);

    this.openRenameModal = this.openRenameModal.bind(this);
    this.closeRenameModal = this.closeRenameModal.bind(this);
    this.handleRenameNodeSubmit = this.handleRenameNodeSubmit.bind(this);

    remote.droplets.command.add('.tree-view li', {
      'tree-view:add-folder': () => {
        this.openModal();
      },
      'tree-view:add-note': () => {
        this.openAddNoteModal();
      },
      'tree-view:rename-folder': () => {
        this.openRenameModal();
      },
      'tree-view:delete-folder': () => {
        const detail = `You deleting: ${this.findSelectedNodeElement().getAttribute('data-name')}`;
        const element = this.findSelectedNodeElement();
        const childId = element.getAttribute('data-id');
        const path = element.getAttribute('data-path');
        const pid = element.getAttribute('data-pid');
        remote.popupMessageDialog({
          type: remote.DIALOG.MESSAGE_TYPE.WARNING,
          title: 'Waring',
          message: 'Are you sure you want to delete this item?',
          detail,
          buttons: ['Confirm', 'Cancel'],
          callback: (resp) => {
            switch (resp) {
              case 0:
                this.props.removeChild(pid, childId);
                this.props.deleteNode(childId, path);
                break;
              case 1:
                break;
              default:
            }
          },
        });
      },
    });
  }

  componentDidMount() {
  }

  openAddNoteModal() {
    this.setState({
      addNoteModalIsOpened: true,
    });
  }

  openRenameModal() {
    this.setState({
      renameModalIsOpened: true,
    });
  }

  closeAddNoteModal() {
    this.setState({
      addNoteModalIsOpened: false,
    });
  }

  closeRenameModal() {
    this.setState({
      renameModalIsOpened: false,
    });
  }

  findSelectedNodeElement() {
    return this.findSelectedElement().parentNode;
  }

  findSelectedElement() {
    return document.querySelector('.tree-view li div.selected');
  }

  handleExpandIcon(node) {
    if (node.childIds.length === 0) {
      return '';
    }
    return node.expanded ? 'expand_more' : 'chevron_right';
  }

  openModal() {
    this.setState({
      isOpened: true,
    });
  }

  closeModal() {
    this.setState({
      isOpened: false,
    });
  }

  renderChild(childId, pid) {
    const node = this.props.nodes[childId];
    return (
      <li
        className={node.isRoot ? 'root' : ''}
        key={childId}
        data-id={childId}
        data-pid={pid}
        data-path={node.path}
        data-name={node.name}
        onContextMenu={(e) => {
          this.props.onNodeSelect(childId);
          remote.popupContextMenuByEvent(e);
          e.stopPropagation();
        }}
      >
        <div
          className={`overlay${node.selected ? ' selected' : ''}`}
        >&nbsp;</div>
        <div
          className="header"
          onClick={() => {
            this.props.onNodeClick(childId, node.path);
          }}
        >

          <i
            className="material-icons md-18"
            onClick={(e) => {
              node.expanded ? this.props.collapse(node.id) : this.props.expand(node.id);
              e.stopPropagation();
            }}
          >{this.handleExpandIcon(node)}</i>
          <i className="material-icons md-18">folder</i>
          <span className="title">{node.name}</span>
          <span className="tip">({node.count}/{node.totalCount})</span>
        </div>
        {node.expanded ? this.renderNode(childId) : null}
      </li>
    );
  }

  renderNode(id) {
    return (
      <ul
        className={`tree-view ${id === 0 ? '' : 'list-tree'}`}
        onContextMenu={(e) => {
          this.props.onContextMenu(e);
          e.stopPropagation();
        }}
      >
        {this.props.nodes[id].childIds.map(childId => this.renderChild(childId, id))}
      </ul>
    );
  }

  handleCreateNodeSubmit(values) {
    const element = this.findSelectedNodeElement();
    const dir = element.getAttribute('data-path');
    const pid = element.getAttribute('data-id');
    const relPath = remote.droplets.dataStore.path.join(dir, values.name);
    remote.droplets.dataStore.mkdir(relPath).then((result) => {
      this.closeModal();
      const childId = this.props.createNode(result, values.name).id;
      this.props.addChild(pid, childId);
    }).catch((err) => {
      console.log(err);
    });
  }

  handleCreateNoteSubmit(values) {
    const element = this.findSelectedNodeElement();
    const dir = element.getAttribute('data-path');
    this.props.createNote(dir, values.title);
    this.closeAddNoteModal();
  }

  handleRenameNodeSubmit(values) {
    const element = this.findSelectedNodeElement();
    const id = element.getAttribute('data-id');
    const path = element.getAttribute('data-path');
    this.props.renameNode(id, values.name, path);
    this.closeRenameModal();
  }

  render() {
    return (
      <div>
        {this.renderNode(0)}
        <Modal
          isOpened={this.state.isOpened}
          onClose={this.closeModal}
        >
          <div className="create-node-modal">
            <CreateNodeFormContainer onSubmit={this.handleCreateNodeSubmit} />
          </div>
        </Modal>
        <Modal
          isOpened={this.state.addNoteModalIsOpened}
          onClose={this.closeAddNoteModal}
        >
          <div className="create-note-modal">
            <CreateNoteFormContainer onSubmit={this.handleCreateNoteSubmit} />
          </div>
        </Modal>
        <Modal
          isOpened={this.state.renameModalIsOpened}
          onClose={this.closeRenameModal}
        >
          <div className="rename-folder-modal">
            <RenameNodeFormContainer onSubmit={this.handleRenameNodeSubmit} />
          </div>
        </Modal>
      </div>
    );
  }
}

Tree.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    isRoot: PropTypes.bool.isRequired,
    childIds: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired).isRequired,
  expand: PropTypes.func.isRequired,
  collapse: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
  onNodeClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func,
  createNode: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  addChild: PropTypes.func.isRequired,
  removeChild: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  renameNode: PropTypes.func.isRequired,
};

Tree.defaultProps = {
  onContextMenu: () => {},
};

export default Tree;
