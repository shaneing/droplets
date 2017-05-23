import React from 'react';
import { connect } from 'react-redux';

import TextEditor from './text-editor';
import * as editorActions from '../../../action/text-editor-action';
import '../styles/text-editor-view.css';

class TextEditorView extends React.Component {
  render() {
    return (
      <div className="text-editor-view">
        <ConnectedTextEditor />
      </div>
    );
  }
}

TextEditorView.propTypes = {};
TextEditorView.defaultProps = {};

const ConnectedTextEditor = connect(
  state => ({
    ...state.editor,
  }), {
    onChange: editorActions.updateContent,
    onLockClick: editorActions.closeTextEditorAndOpenMarkdownPreview,
  },
)(TextEditor);

export default TextEditorView;
