/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import MarkdownPreview from './markdown-preview';
import * as textEditorActions from '../../../action/text-editor-action';

import '../styles/preview-view.css';

class PreviewView extends React.Component {
  render() {
    return (
      <div className="preview-view">
        <ConnectedMarkdownPreview />
      </div>
    )
  }
}

PreviewView.propTypes = {};
PreviewView.defaultProps = {};

const ConnectedMarkdownPreview = connect(
  (state) => ({
    text: state.preview.markdown.text,
    visible: state.preview.markdown.visible,
    path: state.preview.markdown.path,
  }), {
    onUnlockClick: textEditorActions.openTextEditorAndCloseMarkdownPreview,
  }
)(MarkdownPreview);

export default PreviewView;
