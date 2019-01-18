import React, { Component } from 'react';
import Controls from './Controls';
import Board from './Board';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 40,
      running: false,
      frameRate: 5, // steps per second
    };
  }

  toggleRunning = () => {
    (this.state.running ? this.pause() : this.play())
    
    this.setState({
      running: ! this.state.running
    });
  }

  /* Given the 2d array 'table', the row index, and column index,
   * return the number of live neighbors adjacent to that cell. */
  numNeighbors(table, row, col) {
    const neighborOffsets = [
      [-1, -1], // top-left
      [-1, 0],  // top-center
      [-1, 1],  // top-right
      [0, 1],   // right
      [1, 1],   // bottom-right
      [1, 0],   // bottom-center
      [1, -1],  // bottom-left
      [0, -1],  // left
    ];
    
    return neighborOffsets.reduce(
      (acc, [r, c]) => 
        (typeof table[row + r] !== 'undefined' ?
         acc + table[row + r][col + c] :
         acc),
      0
    );
  }
  
  step = () => {
    const table = this.state.table.slice().map(
      (row, r, originalTable) =>
        row.map(
          (cell, c) => {
            const num_neighbors = this.numNeighbors(originalTable, r, c);
            if (cell) { // cell is currenly live
              return (num_neighbors === 2 || num_neighbors === 3);
            } else { // cell if currently dead
              return num_neighbors === 3;
            }
          }
        )
    );
    
    this.setState({
      table: table,
    });
  }

  play() {
    this.interval = setInterval(this.step, (1000 / this.state.frameRate));
  }

  pause() {
    clearInterval(this.interval);
  }

  generateTable() {
    return Array(this.state.size).fill().map(
      () => Array(this.state.size).fill(false)
    );
  }
  
  resetTable = () => {
    this.setState({
      table: this.generateTable()
    });
  }

  toggleCell = (row, col) => {
    let table = this.state.table.slice();
    table[row][col] = ! table[row][col];
    this.setState({
      table: table
    });
  }

  componentDidMount() {
    this.resetTable();
  }
  
  render() {
    const { running, table } = this.state;
    
    return (
      <div>
        <Board table={table}
               toggleCellFn={this.toggleCell} />
        <Controls running={running}
                  toggleRunning={this.toggleRunning}
                  reset={this.resetTable} />
      </div>
    );
  }
}

export default Game;
