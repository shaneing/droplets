import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Note from './note';
import * as actions from '../../../action/note-action';
import { openMarkdownPreview } from '../../../action/preview-action';
import * as remote from '../../../remote';


class NoteList extends React.Component {

  constructor() {
    super();
    remote.droplets.command.add('.card-list-view .card-list .card', {
      'card-list-view:delete-note': () => {
        const element = this.findSelectedNoteElement();
        const id = element.getAttribute('data-id');
        const path = element.getAttribute('data-path');
        this.props.deleteNode(id, path);
      },
    });
  }

  findSelectedNoteElement() {
    return document.querySelector('.card-list-view .card-list .card.selected');
  }

  render() {
    return (
      <div className="card-list">
        {this.props.notes.map(note =>
          (<Note
            {...note}
            key={note.id}
            onClick={() => { this.props.onNoteClick(note.id, note.path, openMarkdownPreview); }}
            deleteNote={() => { this.props.deleteNote(note.id, note.path); }}
            selectNote={() => { this.props.selectNote(note.id); }}
          />))}
      </div>
    );
  }
}

NoteList.propTypes = {
  onNoteClick: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    status: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};
NoteList.defaultProps = {};

const mapStateToProps = state => ({
  notes: state.note,
});

const mapDispatchToProps = {
  onNoteClick: actions.selectNoteAndOpenPreview,
  deleteNode: actions.deleteNote,
  selectNote: actions.selectNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
