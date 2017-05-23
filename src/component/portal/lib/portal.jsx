import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const KEYCODES = {
  ESCAPE: 27,
};

class Portal extends React.Component {

  constructor() {
    super();
    this.state = {
      isActive: false,
    };
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.closePortal = this.closePortal.bind(this);
    this.openPortal = this.openPortal.bind(this);
    this.portal = null;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      let target = this.props.targetId && document.getElementById(this.props.targetId);
      if (!target) {
        target = document.createElement('div');
        target.id = this.props.targetId;
        document.body.appendChild(target);
      }
      this.portal = target;

      if (this.props.closeOnEsc) {
        window.addEventListener('keydown', this.handleKeyDown);
      }

      if (this.props.closeOnOutsideClick) {
        window.addEventListener('mouseup', this.handleOutsideMouseClick);
        window.addEventListener('touchstart', this.handleOutsideMouseClick);
      }

      if (this.props.isOpened) {
        this.openPortal();
      }
    }
  }


  renderPortal() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <div>{React.Children.map(this.props.children, children => children)}</div>,
      this.portal,
    );
  }

  closePortal() {
    if (this.state.isActive) {
      this.resetState();
      this.props.onClose();
      ReactDOM.unmountComponentAtNode(this.portal);
    }
  }

  openPortal() {
    this.setState({
      isActive: true,
    });
    this.renderPortal();
  }

  handleKeyDown(e) {
    if (this.state && this.state.isActive && e.keyCode === KEYCODES.ESCAPE) {
      this.closePortal();
    }
    e.stopPropagation();
  }

  handleOutsideMouseClick(e) {
    if (this.state.isActive) {
      if (!this.portal.contains(e.target)) {
        e.stopPropagation();
        this.closePortal();
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      document.body.removeChild(this.portal);
      this.portal = null;

      if (this.props.closeOnEsc) {
        window.removeEventListener('keydown', this.handleKeyDown);
      }

      if (this.props.closeOnOutsideClick) {
        window.removeEventListener('mouseup', this.handleOutsideMouseClick);
        window.removeEventListener('touchstart', this.handleOutsideMouseClick);
      }
    }
  }

  componentWillReceiveProps(props) {
    if (props.isOpened) {
      if (this.state.isActive) {
        this.renderPortal();
      } else {
        this.openPortal();
      }
    }

    if (!props.isOpened && this.state.isActive) {
      this.closePortal();
    }
  }

  resetState() {
    this.setState({
      isActive: false,
    });
  }

  render() {
    return null;
  }

}

Portal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  targetId: PropTypes.string,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
};

Portal.defaultProps = {
  targetId: Math.random().toString().substr(2),
  closeOnEsc: false,
  closeOnOutsideClick: false,
  isOpened: false,
  onClose: () => {},
};

export default Portal;

