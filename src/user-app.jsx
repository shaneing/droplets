import React, { Component } from 'react';

import TreeView from './view/tree-view';
import CardListView from './view/card-list-view';
import PreviewView from './view/preview-view';
import UserProfileView from './view/user-profile-view';
import TextEditorView from './view/text-editor-view';

class UserApp extends Component {
  render() {
    return (
      <div className="droplets-container">
        <div className="droplets-panel-container header" />

        <div className="droplets-container-axis horizontal">
          <div className="droplets-panel-container left">
            <div className="droplets-panel left">
              <div className="droplets-container-axis vertical" width={200}>
                <UserProfileView />
                <TreeView />
              </div>
            </div>
            <div className="droplets-panel right">
              <CardListView />
            </div>
          </div>
          <div className="droplets-container-axis vertical">
            <PreviewView />
            <TextEditorView />
          </div>
          <div className="droplets-panel-container right" />
        </div>

        <div className="droplets-panel-container footer" />
      </div>
    );
  }
}

export default UserApp;
