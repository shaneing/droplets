import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../portal';

import '../styles/modal.css';

class Modal extends React.Component {

  constructor() {
    super();
    this.portal = null;
  }

  render() {
    return (
      <Portal
        ref={(ref) => { this.portal = ref; }}
        onClose={this.props.onClose}
        isOpened={this.props.isOpened}
        targetId={Math.random().toString(32).substring(2)}
        closeOnEsc
      >
        <div className="modal-overlay" onClick={() => { this.portal.closePortal(); }} />
        <div className="modal" style={this.props.style}>
          {React.Children.map(this.props.children, children => children)}
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.shape({
    width: PropTypes.string,
  }),
};

Modal.defaultProps = {
  isOpened: false,
  onClose: () => {},
  style: {},
};

export default Modal;
