import React, { Component } from 'react';
import Row from './Row'

class Board extends Component {
  render() {
    const { table = [], toggleCellFn } = this.props;
    const rows = table.map(
      (row, i) =>
        <Row key={i} cells={row} toggleCellFn={toggleCellFn.bind(null, i)} />
    );
    
    return (
      <div className="Board">
        {rows}
      </div>
    );
  }
}

export default Board;
