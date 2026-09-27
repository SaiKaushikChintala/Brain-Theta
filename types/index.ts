export type Position = {
  row: number;
  col: number;
};

export type GameState = {
  grid: number[][];
  selected: Position | null;
  validMoves: Position[];
  removedMarbles: number;
  gameOver: boolean;
  won: boolean;
};

export type GameHeaderProps = {
  remainingMarbles: number;
  resetGame: () => void;
};

export type GameBoardProps = {
  boardRef: React.RefObject<HTMLDivElement | null>;
  gameState: GameState;
  boardSize: number;
  focused: Position;
  handleMarbleClick: (row: number, col: number) => void;
  handleBoardKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
