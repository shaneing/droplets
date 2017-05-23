import React from 'react';
import PropTypes from 'prop-types';

class ModalContent extends React.Component {

  render() {
    return (
      <div className="modal-content">
        {this.props.children}
      </div>
    );
  }
}

ModalContent.propTypes = {
  children: PropTypes.element,
};
ModalContent.defaultProps = {
  children: null,
};

export default ModalContent;
