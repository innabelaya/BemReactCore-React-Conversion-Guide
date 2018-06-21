import { Bem, Block } from 'bem-react-core';
import * as React from 'react';
import Square from './Square';

interface IBoardProps {
  props?: {};  
}

interface IBoardState {
  squares: Array<null|string>;
  xIsNext: boolean;
}

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Board extends Block<IBoardProps> {
  public state: IBoardState;

  constructor(props: IBoardProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  public content() {
    const winner = this.calculateWinner(this.state.squares);

    return (
      <React.Fragment>
          <Bem elem="Status">{
            winner?
                'Winner: ' + winner :
                'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
          }</Bem>

          {
            [
              this.renderRow(0),
              this.renderRow(3),
              this.renderRow(6)
            ]
          }
      </React.Fragment>
    );
  }
 
  protected onSquareClick(i: number) {
    const squares = this.state.squares.slice();

    if (this.calculateWinner(squares) || squares[i]){
      return;}

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
        squares,
        xIsNext: !this.state.xIsNext,
    });
  }

  protected renderRow(i: number): JSX.Element {
      return <Bem elem="Row" key={i}>{[
        this.renderSquare(i),
        this.renderSquare(i + 1),
        this.renderSquare(i + 2)
      ]}</Bem>
  }

  protected renderSquare(i: number): JSX.Element {
    return <Square onClick={() => this.onSquareClick(i)} key={i}>
        {this.state.squares[i]}
      </Square>;
  }
  
  private calculateWinner(squares: Array<null|string>) : string|null {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }
}

export default Board;
