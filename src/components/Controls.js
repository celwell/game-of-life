import React, { Component } from 'react';

class Controls extends Component {
  
  render() {
    const { running,
            toggleRunning,
            reset } = this.props;
    
    return (
      <div className="Controls">
        <button onClick={toggleRunning}>
          {running ? "Pause" : "Play"}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }
}

export default Controls;
