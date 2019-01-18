import React, { Component, Fragment } from 'react';
import Controls from './Controls';
import Board from './Board';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 40,
      isRunning: false,
      frameRate: 5, // steps per second
    };
  }

  toggleCell = (row, col) => {
    this.setState((state) => {
      let table = state.table.slice();
      table[row][col] = ! table[row][col];
      return {
        table: table
      };
    });
  }
  
  toggleIsRunning = () => {
    this.setState((state, props) => ({
      isRunning: ! state.isRunning
    }), () => (
      this.state.isRunning ? this.play() : this.pause()
    ));
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
    this.setState((state) => ({
      table: state.table.slice().map(
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
      )
    }));
  }

  play() {
    this.interval = setInterval(this.step, (1000 / this.state.frameRate));
  }

  pause() {
    clearInterval(this.interval);
  }

  generateTable(size) {
    return Array(size).fill().map(
      () => Array(size).fill(false)
    );
  }
  
  resetTable = () => {
    this.setState((state) => ({
      table: this.generateTable(state.size)
    }));
  }

  componentDidMount() {
    this.resetTable();
  }
  
  render() {
    const { isRunning, table } = this.state;
    
    return (
      <Fragment>
        <Board table={table}
               toggleCellFn={this.toggleCell} />
        <Controls isRunning={isRunning}
                  toggleIsRunning={this.toggleIsRunning}
                  reset={this.resetTable} />
      </Fragment>
    );
  }
}

export default Game;
