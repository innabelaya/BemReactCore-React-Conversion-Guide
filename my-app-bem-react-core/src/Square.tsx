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