import React from 'react';
import PropTypes from 'prop-types';

class ResizeHandleView extends React.Component {

  constructor() {
    super();
    this.state = {
      startX: 0,
      isPressed: false,
      width: 0,
      isResizing: false,
    };
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }


  handleMouseDown(e) {
    this.setState({
      startX: e.clientX,
      isPressed: true,
      width: this.props.width,
    });
  }

  handleMouseUp() {
    this.setState({
      isPressed: false,
    });
    console.log('mouse up');
  }

  handleMouseMove(e) {
    if (this.state.isPressed) {
      const vector = e.clientX - this.state.startX;
      console.log(`mouse move ${vector}`);
      this.props.resize(this.state.width + vector);
    }
  }


  render() {
    return (
      <div
        className="tree-view-resize-handle"
        onMouseDown={(e) => { this.handleMouseDown(e); }}
      />
    );
  }
}

ResizeHandleView.propTypes = {
  resize: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
ResizeHandleView.defualtProps = {};

export default ResizeHandleView;
