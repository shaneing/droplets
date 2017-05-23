import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'codemirror/mode/markdown/markdown';
import '../styles/codemirror.css';

class TextEditor extends React.Component {

  render() {
    if (!this.props.visible) {
      return null;
    }

    const options = {
      lineNumbers: true,
      mode: 'markdown',
      lineWrapping: true,
    };
    return (
      <div className="text-editor">
        <CodeMirror
          value={this.props.content}
          onChange={(content) => { this.props.onChange(content); }}
          options={options}

        />
        <div className="fixed-action-btn">
          <a
            className="btn-floating btn-large"
            onClick={
              () => {
                this.props.onLockClick(
                  this.props.content,
                  this.props.path,
                );
              }}
          >
            <i className="material-icons md-24">lock_open</i>
          </a>
        </div>
      </div>
    );
  }

}

TextEditor.propTypes = {
  visible: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onLockClick: PropTypes.func.isRequired,
};

TextEditor.defaultProps = {};

export default TextEditor;

