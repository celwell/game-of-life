import React, { Component } from 'react';
import Cell from './Cell';

class Row extends Component {
  render() {
    const { cells, toggleCellFn } = this.props;
    const cellComponents = cells.map(
      (cell, i) =>
        <Cell key={i} value={cell} toggleCellFn={toggleCellFn.bind(null, i)} />
    );
    
    return (
      <div className="Row">
        {cellComponents}
      </div>
    );
  }
}

export default Row;
