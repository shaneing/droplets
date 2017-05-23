import React from 'react';
import PropTypes from 'prop-types';

class ModalFooter extends React.Component {
  render() {
    return (
      <div className="-footer">
        {React.Children.map(this.props.children, children => children)}
      </div>
    );
  }
}

ModalFooter.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

ModalFooter.defaultProps = {
  children: [],
};

export default ModalFooter;
