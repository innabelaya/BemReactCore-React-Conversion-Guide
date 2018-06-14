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
