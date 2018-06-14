import * as React from 'react';
import Board from './Board';

class Game extends React.Component {
  public render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;

