'use client';

import GameContextProvider from './_shared/context/gameContext';
import ScoreContextProvider from './_shared/context/scoreContext';
import { Game } from './_shared/components/views/Game/game.component';
import { WinBanner } from './_shared/components/views/WinBanner/winBanner.component';

import styles from './page.module.scss';

export default function Home() {
  return (
    <ScoreContextProvider>
      <GameContextProvider>
        <main className={styles.main}>
          <Game />

          <WinBanner />
        </main>
      </GameContextProvider>
    </ScoreContextProvider>
  );
}



