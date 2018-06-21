
// REACT
// import * as React from 'react';
// import Board from './Board';

// class Game extends React.Component {
//   public render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//       </div>
//     );
//   }
// }

// export default Game;


import { Bem, Block } from 'bem-react-core';
import * as React from 'react';
import Board from './Board';

class Game extends Block {
  public content() {
    return (
      <Bem block='Game' elem='Board'>
        <Board />
      </Bem>
    );
  }
}

export default Game;