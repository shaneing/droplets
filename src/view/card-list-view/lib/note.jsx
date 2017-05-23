import React from 'react';
import PropTypes from 'prop-types';
import * as remote from '../../../remote';

const STATUS = {
  DOWNLOAD: 1,
  UPLOAD: 2,
  OFF: 3,
  DONE: 4,
};

class Note extends React.Component {

  constructor() {
    super();
    this.note = null;
  }

  renderStatus(status) {
    switch (status) {
      case STATUS.DOWNLOAD:
        return (
          <i className="material-icons md-18 info-text">cloud_download</i>
        );
      case STATUS.UPLOAD:
        return (
          <i className="material-icons md-18 info-text">cloud_upload</i>
        );
      case STATUS.DONE:
        return (
          <i className="material-icons md-18 success-text">cloud_done</i>
        );
      case STATUS.OFF:
        return (
          <i className="material-icons md-18 error-text">cloud_off</i>
        );
      default:
        return (
          <i className="material-icons md-18 error-text">cloud_off</i>
        );
    }
  }

  render() {
    const className = `card ${this.props.selected ? 'selected' : ''}`;
    return (
      <div
        ref={(ref) => { this.note = ref; }}
        className={className}
        data-id={this.props.id}
        data-path={this.props.path}
        data-author={this.props.author}
        onClick={this.props.onClick}
        onContextMenu={(e) => {
          this.props.selectNote();
          remote.popupContextMenuByEvent(e);
        }}
      >
        <div className="card-content">
          <span className="card-title">{this.props.title}</span>
          <div className="card-chips">
            {this.props.tags.map(tag => <div className="chip">{tag}</div>)}
          </div>
        </div>
        <div className="card-footer">
          <span className="card-info">{this.props.date}</span>
        </div>
        <div className="card-status">
          {this.renderStatus(this.props.status)}
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
};
Note.defaultProps = {};

export default Note;
