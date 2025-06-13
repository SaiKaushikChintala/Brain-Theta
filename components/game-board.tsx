"use client";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { GameBoardProps } from "@/types";

export default function GameBoard({
  boardRef,
  gameState,
  boardSize,
  handleMarbleClick,
}: GameBoardProps) {
  const renderBoard = () => {
    const { grid, selected, validMoves } = gameState;
    const gridSize = 7;
    const cellSize = 100 / (gridSize + 1);
    const baseHoleSize = boardSize * 0.11;

    const marbleSize = baseHoleSize * 0.85;
    const highlightSize = marbleSize * 0.33;

    const elements = [];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellValue = grid[row][col];
        if (cellValue === 0) continue;

        const top = (row + 1) * cellSize;
        const left = (col + 1) * cellSize;

        const isSelected = selected?.row === row && selected?.col === col;
        const isValidMove = validMoves.some(
          (move) => move.row === row && move.col === col,
        );

        elements.push(
          <motion.div
            key={`hole-${row}-${col}`}
            style={{
              width: `${baseHoleSize}px`,
              height: `${baseHoleSize}px`,
              top: `calc(${top}% - ${baseHoleSize / 2}px)`,
              left: `calc(${left}% - ${baseHoleSize / 2}px)`,
              zIndex: 1,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => isValidMove && handleMarbleClick(row, col)}
            className={cn(
              "absolute rounded-full transition-all duration-300",
              "bg-red-600",
              isValidMove && "cursor-pointer",
            )}
          />,
        );

        if (cellValue === 1) {
          elements.push(
            <motion.div
              key={`marble-${row}-${col}`}
              className={cn(
                "absolute cursor-pointer rounded-full bg-zinc-900",
                isSelected ? "ring-2 ring-yellow-400" : "",
              )}
              style={{
                width: `${marbleSize}px`,
                height: `${marbleSize}px`,
                top: `calc(${top}% - ${marbleSize / 2}px)`,
                left: `calc(${left}% - ${marbleSize / 2}px)`,
                zIndex: 2,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isSelected ? 1.15 : 1,
                opacity: 1,
                boxShadow: isSelected
                  ? "0 0 10px rgba(250, 204, 21, 0.7), 0 4px 6px rgba(0,0,0,0.3)"
                  : "0 3px 5px rgba(0,0,0,0.4)",
              }}
              exit={{
                scale: 0,
                opacity: 0,
                y: 20,
                transition: { duration: 0.4, ease: "backIn" },
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              onClick={() => handleMarbleClick(row, col)}
              whileHover={{
                scale: 1.15,
                y: -2,
                boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute rounded-full bg-zinc-700"
                style={{
                  width: `${highlightSize}px`,
                  height: `${highlightSize}px`,
                  top: `${highlightSize / 2}px`,
                  left: `${highlightSize / 2}px`,
                }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>,
          );
        }
      }
    }

    return elements;
  };
  return (
    <div className="relative aspect-square w-full max-w-[95vw] sm:max-w-[520px] md:max-w-[640px]">
      <motion.div
        ref={boardRef}
        className="absolute inset-0 scale-[1.05] rounded-full bg-white p-1 shadow-[0_0_30px_rgba(0,0,0,0.2)] sm:scale-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-red-500 to-red-600">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />
          <AnimatePresence>{renderBoard()}</AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
