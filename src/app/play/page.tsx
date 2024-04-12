"use client";

import { useCallback, useContext } from "react";
import { useRouter } from "next/navigation";

import { Logo, Button, RestartIcon } from "@/ui";
import { Tile } from "./_shared/components/Tile/tile.component";
import { TurnBadge } from "./_shared/components/TurnBadge/turnBadge.component";
import { WinBanner } from "./_shared/components/WinBanner/winBanner.component";
import { ScoreBadge } from "./_shared/components/ScoreBadge/scoreBadge.component";
import { GameContextProps, GameContext } from "@/app/play/_shared/context/gameContext";
import { ScoreContext, ScoreContextProps } from "@/app/play/_shared/context/scoreContext";

import styles from "./page.module.scss";
import colors from "@/theme/colors.module.scss";

const GRID_ROWS = 3;
const GRID_COLUMNS = 3;

export default function Home() {
  const router = useRouter();

  const { winsByX, winsByO, draws } = useContext<ScoreContextProps>(ScoreContext);
  const { tiles, winningTiles, currentPlayer, isCPUPlaying, onPlay } = useContext<GameContextProps>(GameContext);

  const onReturnHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles["head__logo"]}>
            <Logo />
          </div>

          <TurnBadge currentPlayer={currentPlayer} />

          <div className={styles["head__restart-button"]}>
            <Button variant="icon-only" color="gray" label={<RestartIcon />} onClick={onReturnHome} />
          </div>
        </div>

        <div className={styles.field}>
          {[...Array(GRID_ROWS).keys()].map((rowIndex) => (
            <div key={`row-${rowIndex}`} className={styles["field-row"]}>
              {[...Array(GRID_COLUMNS).keys()].map((colIndex) => (
                <Tile
                  key={`tile-${rowIndex}-${colIndex}`}
                  isSelectedBy={tiles[`row${rowIndex}-col${colIndex}`]}
                  isWinner={winningTiles.includes(`row${rowIndex}-col${colIndex}`)}
                  isDisabled={isCPUPlaying}
                  currentPlayer={currentPlayer}
                  onClick={() => onPlay(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.score}>
          <ScoreBadge title="X (P1)" points={winsByX} backgroundColor={colors.lightBlue} />

          <ScoreBadge title="TIES" points={draws} backgroundColor={colors.silver} />

          <ScoreBadge title="O (P2)" points={winsByO} backgroundColor={colors.lightYellow} />
        </div>
      </div>

      <WinBanner />
    </main>
  );
}
