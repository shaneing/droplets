import { connect } from 'react-redux';

import TextEditor from './text-editor';
import * as editorActions from '../../../action/text-editor-action';

const TextEditorContainer = connect(
  state => ({
    ...state.editor,
  }), {
    onChange: editorActions.updateContent,
    onLockClick: editorActions.closeTextEditorAndOpenMarkdownPreview,
  },
)(TextEditor);

export default TextEditorContainer;
