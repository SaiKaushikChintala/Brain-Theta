"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { HelpCircle, Moon, Settings, Sun, Info } from "lucide-react";

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

export default function GameMenu() {
  const { theme, setTheme } = useTheme();
  const [showRules, setShowRules] = useState<boolean>(false);

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
    </>
  );
}
