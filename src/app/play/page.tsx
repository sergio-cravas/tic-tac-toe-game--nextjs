"use client";

import GameContextProvider from "./_shared/context/gameContext";
import ScoreContextProvider from "./_shared/context/scoreContext";
import { TileGrid } from "./_shared/components/TileGrid/tileGrid.component";
import { WinBanner } from "./_shared/components/WinBanner/winBanner.component";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <ScoreContextProvider>
        <GameContextProvider>
          <TileGrid />

          <WinBanner />
        </GameContextProvider>
      </ScoreContextProvider>
    </main>
  );
}
