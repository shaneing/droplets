import React from 'react';
import '../styles/text-editor-view.css';
import TextEditorContainer from './text-editor-container';

class TextEditorView extends React.Component {
  render() {
    return (
      <div className="text-editor-view">
        <TextEditorContainer />
      </div>
    );
  }
}

TextEditorView.propTypes = {};
TextEditorView.defaultProps = {};


export default TextEditorView;
