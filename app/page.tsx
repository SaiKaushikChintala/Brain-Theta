import PegSolitaire from "@/components/peg-solitaire";
import GameMenu from "@/components/game-menu";
import { SoundProvider } from "@/components/sound-provider";

export default function Home() {
  return (
    <main>
      <SoundProvider>
        <PegSolitaire />
        <GameMenu />
      </SoundProvider>
    </main>
  );
}
