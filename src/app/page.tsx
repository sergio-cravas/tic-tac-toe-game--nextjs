'use client';

import { useCallback, useState } from 'react';

import { Logo } from '@/ui/Logo/logo';
import { Button } from '@/ui/Button/button';
import { TurnBadge } from './_shared/components/TurnBadge/turnBadge.component';
import { ScoreBadge } from './_shared/components/ScoreBadge/scoreBadge.component';

import styles from './page.module.scss';
import colors from '@/theme/colors.module.scss';
import { Tile } from './_shared/components/Tile/tile.component';
import { RestartIcon } from '@/ui/RestartIcon/restartIcon.component';

export default function Home() {
  const [currentPlayer, setCurrentPlayer] = useState<'x' | 'o'>('x');

  const handleOnTileClick = useCallback(() => {
    setCurrentPlayer((prev) => (prev === 'o' ? 'x' : 'o'));
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <Logo />

        <TurnBadge currentPlayer={currentPlayer} />

        <Button variant="icon-only" color="gray" label={<RestartIcon />} />
      </div>

      <div className={styles.field}>
        <div className={styles['field-row']}>
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
        </div>

        <div className={styles['field-row']}>
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
        </div>

        <div className={styles['field-row']}>
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
          <Tile currentPlayer={currentPlayer} onClick={handleOnTileClick} />
        </div>
      </div>

      <div className={styles.score}>
        <ScoreBadge title="O (CPU)" points={14} backgroundColor={colors.lightBlue} />

        <ScoreBadge title="TIES" points={32} backgroundColor={colors.silver} />

        <ScoreBadge title="X (YOU)" points={11} backgroundColor={colors.lightYellow} />
      </div>
    </main>
  );
}
