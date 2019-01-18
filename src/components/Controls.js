import React, { Component } from 'react';

class Controls extends Component {
  
  render() {
    const { isRunning,
            toggleIsRunning,
            reset } = this.props;
    
    return (
      <div className="Controls">
        <button onClick={toggleIsRunning}>
          {isRunning ? "Pause" : "Play"}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }
}

export default Controls;
