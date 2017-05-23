import React from 'react';
import PropTypes from 'prop-types';

class Metrics extends React.Component {

  render() {
    return (
      <div className="metrics">
        <div className="metric">
          <span className="name">Notes</span>
          <span className="digest">{this.props.notes}</span>
        </div>
      </div>
    );
  }
}

Metrics.propTypes = {
  notes: PropTypes.number,
};
Metrics.defaultProps = {
  notes: 0,
};

export default Metrics;
