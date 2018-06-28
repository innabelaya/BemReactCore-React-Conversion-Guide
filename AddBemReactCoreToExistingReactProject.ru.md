# Как добавить bem-react-core в существующий React-проект

В документе показано, как добавить библиотеку в существующий react-проект и перевести React-компоненты в [блоки]() bem-react-core.

> Руководство содержит примеры миграции с React.js на Bem React Core с поддержкой TypeScript.

  * [О пректе](#)
  * [Установка библиотеки в проект](#Установка)
  * [Создание блоков](#)
    * [Создание дополнительной HTML-разметки](#)
  * [Создание блоков и элементов](#)
  * [Создание модификаторов](#)

Блоки bem-react-core полностью совместимы с React-компонентами и могут использоваться в проекте одновременно. Поэтому начать использовать bem-react-core можно, не переписывая все компоненты существующего проекта. 

## О проекте

В качестве примера в руководстве используется [React-проект](https://github.com/innabelaya/BemReactCore-React-Conversion-Guide/blob/master/my-app-react-ts/) с поддержкой TypeScript, созданный с помощью [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript). 

В проекте реализована игра крестики-нолики. Код проекта состоит из комопнентов [Game](https://github.com/innabelaya/BemReactCore-React-Conversion-Guide/blob/master/my-app-react-ts/src/Game.tsx), [Square](https://github.com/innabelaya/BemReactCore-React-Conversion-Guide/blob/master/my-app-react-ts/src/Square.tsx) и [Board](https://github.com/innabelaya/BemReactCore-React-Conversion-Guide/blob/master/my-app-react-ts/src/Board.tsx).  

Блок `Square` отвечает за генерацию кнопок, из которых строится поле игры. Блок `Board` предоставляет основную логику игры, определяет последовательность ходов и победителя. Блок `Game` задает HTML-разметку страницы.

Чтобы получить локальную копию этого проекта, склонируйте репозиторий: 

```bash
git clone ... my-app-react-project
```

Запустите сервер: 

```bash
npm start
```

Перейдите по адресу `localhost:3000`, чтобы увидеть результат.

![TODO скриншот]() 

## Установка Bem React Core

Чтобы установить библиотеку, перейдите в папку проекта и выполните команды:

```bash
npm init
npm install --save bem-react-core react react-dom
```

> [Подробнее про способы установки библиотеки](./README.ru.md#Установка)

### Поддержка TypeScript

В библиотеку Bem React Core v2 по умолчанию включена поддержка TypeScript. Чтобы добавить поддержку TypeScript в ваш React-проект, воспользуйтесь [инструкцией по преобразованию React-проекта, написанного на JavaScript, в TypeScript](https://github.com/Microsoft/TypeScript-React-Conversion-Guide).

## Создание (объявление) блока

Блок [Game]() предоставляет HTML-разметку страницы, которую можно наполнить любым содержанием. 

```jsx
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
```

Чтобы начать работу с блоком из bem-react-core, необходимо импортировать класс Block из библиотеки bem-react-core. Это базовый класс для создания экземпляров блоков.

```jsx
+ import { Block } from 'bem-react-core';
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
```

Объявляем сам блок: 

```jsx
+ import { Block } from 'bem-react-core';
import * as React from 'react';
import Board from './Board';

+ class Game extends Block {
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
```

В библиотеке Bem React Core не используется метод `render()`. Чтобы определить содержимое блока или элемента, используйте метод [content()](./REFERENCE.ru.md#content). 

```jsx
import { Block } from 'bem-react-core';
import * as React from 'react';
import Board from './Board';

+ class Game extends Block {
+     public content() {
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
```

#### Добавление произвольной HTML-разметки

Для создания произвольных HTML-элементов используется [BEM-хелпер](), который необходимо импортировать из библиотеки bem-react-core. По умолчанию новый HTML-элемент получает тег `<div>`. 

> Чтобы изменить HTML-элемент, используйте дополнительные [свойства хелпера Bem]().

Воссоздадим текущую разметку блока с помощью элемента `Board` блока `Game`.

```jsx
+ import { Bem, Block } from 'bem-react-core';
import * as React from 'react';
import Board from './Board';

class Game extends Block {
    public content() {
        return (
+             <Bem block='Game' elem='Board'>
+                 <Board />
+             </Bem>
        );
    }
}

export default Game;
```

React-компонент `Game` и блок bem-react-core `Game` вернут одинаковую HTML-разметку: 

```html
<div class="Game">
    <div class="Game-Board">
        ...
    </div>
</div>
```

### 




Объявим блок Board, импортируем для этого класс Block из bem-react-core.

import { Block } from 'bem-react-core';
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











```jsx
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
```


















### Square

React

```jsx
import * as React from 'react';

interface ISquareProps {
    onClick: () => void;
    value: string;
}

function Square(props: ISquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
```


BEM React Core
```jsx
import { Block, Tag } from 'bem-react-core';

interface ISquareProps {
  onClick: () => void;
}

class Square extends Block<ISquareProps> {
  protected tag(): Tag {
    return 'button';
  }

  protected attrs(props: ISquareProps) {
    return { onClick: props.onClick };
  }
}

export default Square;
```








## Обзор существующего React-проекта

Проект представляет собой игру в крестики нолики. Чтобы создать игру, реализовано три компонента: Square, Board и Game.

Блок Square отвечает за генерацию отдельной кнопки. Блок Board рендерит 9 квадратов, которые представлены отдельными блоками (Square). Блок Game реднерит component renders a board with some placeholders that we’ll fill in later. None of the components are interactive at this point.

Основная функциональность заключена в блоке Board: здесь определеяется ход игры и победитель. Поэтому этот блок и перепишем на Bem React Core.


```tsx
import * as React from 'react';
import Square from './Square'

export interface IBoardProps {
  props?: string;  
}

interface IBoardState {
  squares: any;
  xIsNext: boolean;
}

export class Board extends React.Component<IBoardProps> {
  public state: IBoardState;

  constructor(props: IBoardProps, context: any) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  public render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  protected handleClick(i: any) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    });
  }

  protected renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
}

function calculateWinner(squares: number[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const line = lines.find(lineIndeces => {
    const [a, b, c] = lineIndeces;

    return Boolean(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]);
  });

  return line ? squares[line[0]] : null;
}

export default Board;
```


Вопросы:
Если подключаешь brc в проект, который моздан не с create-app, нужно как-то настраивать сборку дополнительно? что-то здесь описывтаь нужно?








