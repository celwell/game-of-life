import React from 'react';

const Cell = ({ value, toggleCellFn }) => (
  <span className={`Cell ${value && 'filled'}`}
        onMouseDown={toggleCellFn} />
);

export default Cell;
