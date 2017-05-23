/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import marked from './marked';

class MarkdownPreview extends React.Component {

  constructor() {
    super();
    this.getMarkdown = this.getMarkdown.bind(this);
  }

  filterFlag(text) {
    return text.substring(text.indexOf('---', 3) + 3);
  }

  getMarkdown() {
    return {
      __html: marked(this.filterFlag(this.props.text)),
    };
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    console.log(this.props.path);
    return (
      <div className="markdown-preview">
        <div
          id={Math.random().toString(32).substring(2)}
          className="markdown-body"
          dangerouslySetInnerHTML={this.getMarkdown()}
        />
        <div className="fixed-action-btn">
          <a
            className="btn-floating btn-large"
            onClick={() => {
              this.props.onUnlockClick(
                this.props.text,
                this.props.path,
              );
            }}
          >
            <i className="material-icons md-24">lock</i>
          </a>
        </div>
      </div>
    );
  }
}

MarkdownPreview.propTypes = {
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  onUnlockClick: PropTypes.func.isRequired,
};

MarkdownPreview.defaultProps = {};

export default MarkdownPreview;
