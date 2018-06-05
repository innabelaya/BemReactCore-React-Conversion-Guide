import React from 'react';
import Board from './Board';

class Game extends React.Component {
  render() {
    return (
      <div className="Game">
      <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
