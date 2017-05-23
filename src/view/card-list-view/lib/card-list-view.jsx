import React from 'react';
import { connect } from 'react-redux';

import NoteList from './note-list';
import '../styles/card-list.css';

import SearchBar from '../../../component/search-bar';
import * as autoActions from '../../../action/auto-complete-action';
import * as noteActions from '../../../action/note-action';

class CardListView extends React.Component {

  render() {
    return (
      <div className="card-list-view">
        <ConnectedSearchBar />
        <div className="card-list">
          <NoteList />
        </div>
      </div>
    );
  }
}

CardListView.propTypes = {};
CardListView.defualtProps = {};

const mapStateToProps = state => ({
  keywords: state.auto.notes,
});

const mapDispatchToProps = {
  onChange: autoActions.getMatchedKeywordsForNoteSearchAuto,
  onSearch: noteActions.searchNote,
  onEnterDown: autoActions.saveKeywordForNoteSearchAuto,
};

const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

export default CardListView;
