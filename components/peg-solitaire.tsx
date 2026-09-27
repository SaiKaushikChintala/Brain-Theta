"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { toast } from "sonner";

import GameBoard from "./game-board";
import GameHeader from "./game-header";
import { useSound } from "./sound-provider";
import { playMoveSound, playSelectSound, playWinSound, playLoseSound } from "@/lib/sounds";
import type { GameState, Position } from "@/types";

export default function PegSolitaire() {
  const initialGrid = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
  ];

  const boardRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<GameState>({
    grid: structuredClone(initialGrid),
    selected: null,
    validMoves: [],
    removedMarbles: 0,
    gameOver: false,
    won: false,
  });

  const [remainingMarbles, setRemainingMarbles] = useState(32);
  const [boardSize, setBoardSize] = useState(0);
  const [focused, setFocused] = useState<Position>({ row: 3, col: 3 });

  const { enabled: soundEnabled } = useSound();

  const countMarbles = useCallback((grid: number[][]): number => {
    return grid.flat().filter((cell) => cell === 1).length;
  }, []);

  const findValidMoves = useCallback(
    (pos: Position, grid: number[][]): Position[] => {
      const { row, col } = pos;
      const directions = [
        { dr: -2, dc: 0 },
        { dr: 0, dc: 2 },
        { dr: 2, dc: 0 },
        { dr: 0, dc: -2 },
      ];

      return directions.reduce<Position[]>((moves, { dr, dc }) => {
        const newRow = row + dr;
        const newCol = col + dc;
        const middleRow = row + dr / 2;
        const middleCol = col + dc / 2;

        if (
          newRow >= 0 &&
          newRow < 7 &&
          newCol >= 0 &&
          newCol < 7 &&
          grid[newRow][newCol] === 2 &&
          grid[middleRow][middleCol] === 1
        ) {
          moves.push({ row: newRow, col: newCol });
        }

        return moves;
      }, []);
    },
    [],
  );

  const checkRemainingMoves = useCallback(
    (grid: number[][]): number => {
      let moves = 0;
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (grid[r][c] === 1) {
            moves += findValidMoves({ row: r, col: c }, grid).length;
          }
        }
      }
      return moves;
    },
    [findValidMoves],
  );

  const updateBoardSize = useCallback(() => {
    if (boardRef.current) {
      const container = boardRef.current.parentElement;
      if (container) {
        const minDimension = Math.min(
          container.clientWidth,
          container.clientHeight,
        );
        setBoardSize(minDimension * 0.9);
      }
    }
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      grid: structuredClone(initialGrid),
      selected: null,
      validMoves: [],
      removedMarbles: 0,
      gameOver: false,
      won: false,
    });
  }, []);

  useEffect(() => {
    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);
    return () => window.removeEventListener("resize", updateBoardSize);
  }, [updateBoardSize]);

  useEffect(() => {
    const marblesCount = countMarbles(gameState.grid);
    setRemainingMarbles(marblesCount);
  }, [gameState.grid]);

  useEffect(() => {
    if (gameState.gameOver) {
      if (soundEnabled) {
        if (gameState.won) playWinSound();
        else playLoseSound();
      }
      toast(
        gameState.won
          ? "🎉 Victory! Only one marble left."
          : "❌ Game Over! No more moves available.",
        {
          duration: 4000,
          onAutoClose: () => resetGame(),
          onDismiss: () => resetGame(),
        },
      );
    }
  }, [gameState.gameOver, gameState.won, resetGame, soundEnabled]);

  const moveFocus = useCallback(
    (dr: number, dc: number) => {
      setFocused((prev) => {
        let row = prev.row;
        let col = prev.col;

        do {
          row += dr;
          col += dc;
        } while (
          row >= 0 &&
          row < 7 &&
          col >= 0 &&
          col < 7 &&
          gameState.grid[row][col] === 0
        );

        if (row < 0 || row >= 7 || col < 0 || col >= 7) return prev;
        return { row, col };
      });
    },
    [gameState.grid],
  );

  const handleMarbleClick = useCallback(
    (row: number, col: number) => {
      setFocused({ row, col });

      setGameState((prevState) => {
        const newState = {
          ...prevState,
          grid: structuredClone(prevState.grid),
        };
        const { grid, selected } = newState;

        if (selected) {
          const isValidMove = newState.validMoves.some(
            (move) => move.row === row && move.col === col,
          );

          if (isValidMove) {
            const middleRow = (selected.row + row) / 2;
            const middleCol = (selected.col + col) / 2;

            grid[selected.row][selected.col] = 2;
            grid[middleRow][middleCol] = 2;
            grid[row][col] = 1;

            newState.removedMarbles += 1;
            newState.selected = null;
            newState.validMoves = [];

            const remainingMoves = checkRemainingMoves(grid);
            newState.gameOver = remainingMoves === 0;
            const marblesLeft = countMarbles(grid);
            newState.won = marblesLeft === 1;

            if (soundEnabled) playMoveSound();

            return newState;
          } else if (grid[row][col] === 1) {
            newState.selected = { row, col };
            newState.validMoves = findValidMoves({ row, col }, grid);

            if (soundEnabled) playSelectSound();

            return newState;
          } else {
            newState.selected = null;
            newState.validMoves = [];
            return newState;
          }
        } else if (grid[row][col] === 1) {
          newState.selected = { row, col };
          newState.validMoves = findValidMoves({ row, col }, grid);

          if (soundEnabled) playSelectSound();

          return newState;
        }

        return newState;
      });
    },
    [countMarbles, checkRemainingMoves, findValidMoves, soundEnabled],
  );

  const handleBoardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
          event.preventDefault();
          moveFocus(-1, 0);
          break;
        case "arrowdown":
        case "s":
          event.preventDefault();
          moveFocus(1, 0);
          break;
        case "arrowleft":
        case "a":
          event.preventDefault();
          moveFocus(0, -1);
          break;
        case "arrowright":
        case "d":
          event.preventDefault();
          moveFocus(0, 1);
          break;
        case "enter":
        case " ":
          event.preventDefault();
          handleMarbleClick(focused.row, focused.col);
          break;
        default:
          break;
      }
    },
    [moveFocus, focused, handleMarbleClick],
  );

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-4 md:min-h-screen dark:from-zinc-900 dark:to-zinc-800">
      <GameHeader remainingMarbles={remainingMarbles} resetGame={resetGame} />

      <div className="flex w-full items-center justify-center p-4 pt-0">
        <GameBoard
          boardRef={boardRef}
          gameState={gameState}
          boardSize={boardSize}
          focused={focused}
          handleMarbleClick={handleMarbleClick}
          handleBoardKeyDown={handleBoardKeyDown}
        />
      </div>
    </div>
  );
}
