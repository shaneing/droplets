import React from 'react';
import ReactDOM from 'react-dom';
import * as remote from '../../../remote';
import MetricsContainer from './metrics-container';

import '../styles/user-profile-view.css';

class UserProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: remote.droplets.user.currentUser && remote.droplets.user.currentUser.username,
    };
  }

  getUsername() {
    if (this.state.username) {
      return this.state.username;
    }
    return 'No Login !';
  }

  getSyncIcon() {
    return this.state.username ? 'sync' : 'sync_disabled';
  }

  getProfileHeader() {
    if (this.state.username) {
      return (
        <div className="image">
          <i
            className="material-icons md-48"
            onClick={() => {
              ReactDOM.unmountComponentAtNode(document.getElementById('droplets'));
              remote.droplets.user.clearCurrentUser();
              remote.droplets.closeMainWindow();
              remote.droplets.createFramelessWindow();
            }}
          >account_circle</i>
        </div>
      );
    }

    return (
      <a
        className="btn"
        onClick={() => {
          ReactDOM.unmountComponentAtNode(document.getElementById('droplets'));
          remote.droplets.closeMainWindow();
          remote.droplets.createFramelessWindow();
        }}
      >Login</a>
    );
  }

  render() {
    return (
      <div className="user-profile-view">
        <div className="profile-header">{this.getProfileHeader()}</div>
        <div className="profile-content">
          <span className="username">
            {this.getUsername()}
          </span>
        </div>
        <div className="profile-footer">
          <MetricsContainer />
        </div>
        <a className="btn-floating halfway-fab">
          <i className="material-icons">{this.getSyncIcon()}</i>
        </a>
      </div>
    );
  }
}

UserProfileView.propTypes = {};
UserProfileView.defaultProps = {};

export default UserProfileView;
