import React from 'react';
import Board from './Board';

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="Game">
//         <div className="game-board">
//           <Board />
//         </div>
//       </div>
//     );
//   }
// }



    

import { Bem, Block } from 'bem-react-core';


class Game extends Block {
    block = 'Game';

    content() {
        return (
            <Bem elem='wrap'>
                <Board />
            </Bem>
        );
    }
}

export default Game;

