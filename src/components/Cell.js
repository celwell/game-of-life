import React, { Component } from 'react';

class Cell extends Component {
  render() {
    const { value, toggleCellFn } = this.props;
    
    return (
      <span className={`Cell ${value && 'filled'}`}
            onMouseDown={toggleCellFn} />
    );
  }
}

export default Cell;
