import React from 'react';
import { Block } from 'bem-react-core';
import Board from './Board';

export default Game;

class Game extends Block {
    block = 'Game';
    content() {
        return (
          <div className="Game">
          <div className="game-board">
              <Board />
            </div>
          </div>
        );
    }
}
