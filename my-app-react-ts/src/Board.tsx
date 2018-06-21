import * as React from 'react';
import Square from './Square';

export interface IBoardProps {
  props?: {};  
}

export interface IBoardState {
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

 export class Board extends React.Component<IBoardProps> {
 public state: IBoardState;

  constructor(props: IBoardProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  public render() {
    const winner = this.calculateWinner(this.state.squares);
    let status
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div> 

        {[
          this.renderRow(0),
          this.renderRow(3),
          this.renderRow(6)
        ]}
      </div>
    );
  }

  protected onSquareClick(i: number) {
    const squares = this.state.squares.slice();

    if (this.calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
        squares,
        xIsNext: !this.state.xIsNext,
    });
  }

  protected renderSquare(i: number): JSX.Element {
    return <Square onClick={() => this.onSquareClick(i)} key={i} value={this.state.squares[i]}/>
  }

  // Row
  protected renderRow(i: number): JSX.Element {
    return (
        <div className="Board-Row" key={i}> {[
          this.renderSquare(i),
          this.renderSquare(i + 1),
          this.renderSquare(i + 2)
        ]}</div>
    )
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
