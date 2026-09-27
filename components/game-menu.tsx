"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  HelpCircle,
  Keyboard,
  Moon,
  Settings,
  Sun,
  Info,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSound } from "./sound-provider";

export default function GameMenu() {
  const { theme, setTheme } = useTheme();
  const { enabled: soundEnabled, toggle: toggleSound } = useSound();
  const [showRules, setShowRules] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="fixed right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            size="icon"
            variant="outline"
          >
            <Settings className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Game Options</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowRules(true)}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Game Rules</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowControls(true)}>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard Controls</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Switch to Light</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Switch to Dark</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={toggleSound}
            aria-checked={soundEnabled}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                <span>Sound: On</span>
              </>
            ) : (
              <>
                <VolumeX className="mr-2 h-4 w-4" />
                <span>Sound: Off</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="mx-auto mt-4 max-h-[90dvh] w-full max-w-xs overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
              <Info className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              Peg Solitaire Rules
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-xs leading-relaxed sm:text-sm md:text-base">
            <div>
              <h3 className="mb-1 text-sm font-semibold sm:text-base">
                Objective:
              </h3>
              <p>
                Eliminate as many marbles as possible by jumping over them. The
                goal is to finish with only <strong>one marble</strong> left on
                the board.
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold sm:text-base">
                How to Play:
              </h3>
              <ol className="list-decimal space-y-1.5 pl-5">
                <li>Click on a marble to select it.</li>
                <li>
                  Jump it over an adjacent marble (up, down, left, or right)
                  into an empty hole.
                </li>
                <li>The marble that was jumped over will be removed.</li>
                <li>
                  Continue making valid moves until no more moves are available.
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold sm:text-base">
                Valid Moves:
              </h3>
              <p>
                A marble can jump only horizontally or vertically over an
                adjacent marble into an empty hole. Diagonal moves are not
                allowed.
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold sm:text-base">
                Winning:
              </h3>
              <p>
                You win the game if you manage to leave exactly one marble on
                the board.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showControls} onOpenChange={setShowControls}>
        <DialogContent className="mx-auto mt-4 max-h-[90dvh] w-full max-w-xs overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
              <Keyboard className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              Keyboard Controls
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-xs leading-relaxed sm:text-sm md:text-base">
            <p>
              Click the board once, or Tab to it, to give it keyboard focus.
            </p>

            <div className="flex items-center justify-between gap-4">
              <span>Move focus</span>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                ↑ ↓ ← → / W A S D
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span>Select / jump</span>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Enter / Space
              </span>
            </div>

            <p>
              Move focus onto a marble and select it, then move focus onto a
              highlighted hole and select again to jump.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
