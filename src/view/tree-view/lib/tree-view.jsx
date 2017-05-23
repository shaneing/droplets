import React from 'react';

import TreeContainer from './tree-container';

import '../styles/tree-view.css';

class TreeView extends React.Component {

  render() {
    return (
      <div
        ref={(element) => { this.tree = element; }}
        className="tree-view-resizer"
      >
        <div className="tree-view-scroller">
          <TreeContainer />
        </div>
      </div>
    );
  }
}

TreeView.propTypes = {};
TreeView.defaultProps = {};

export default TreeView;
