"use client";

import { RotateCcw, Target } from "lucide-react";

import { Button } from "./ui/button";
import type { GameHeaderProps } from "@/types";

export default function GameHeader({
  remainingMarbles,
  resetGame,
}: GameHeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-zinc-200 bg-white/80 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 flex-wrap items-center justify-between px-2 sm:px-4">
          <div className="mt-1.5 flex items-center space-x-2 sm:space-x-3">
            <Target className="h-7 w-7 text-zinc-900 sm:h-8 sm:w-8 dark:text-zinc-100" />
            <h1 className="text-lg font-bold text-zinc-900 sm:text-2xl dark:text-zinc-100">
              Brain Theta
            </h1>
          </div>
          <div className="mt-2 flex items-center space-x-2 sm:mt-0 sm:space-x-4">
            <div className="flex h-9 items-center justify-center rounded-md border border-zinc-200 bg-white px-3 shadow-sm sm:px-4 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="mr-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                Marbles:
              </span>
              <span className="text-sm font-bold text-zinc-900 sm:text-base dark:text-zinc-100">
                {remainingMarbles}
              </span>
            </div>
            <Button
              onClick={resetGame}
              className="flex h-9 w-9 items-center justify-center rounded-full sm:h-auto sm:w-auto sm:space-x-1 sm:rounded-b-full sm:px-4 sm:py-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="hidden font-medium sm:inline">Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
