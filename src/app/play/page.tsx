"use client";

import { Suspense, useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const { winsByX, winsByO, draws } = useContext<ScoreContextProps>(ScoreContext);
  const { tiles, winner, winningTiles, currentPlayer, onPlay, onCPUPlay, onReset } = useContext<GameContextProps>(GameContext);

  const mode = useMemo(() => searchParams.get("mode"), [searchParams]);
  const player1 = useMemo(() => searchParams.get("p1"), [searchParams]);

  const handleOnTileClick = useCallback(
    (row: number, column: number) => {
      const newTiles = onPlay(row, column, currentPlayer, tiles);

      if (!winner && mode === "pve") {
        setTimeout(() => onCPUPlay(player1 === "x" ? "o" : "x", newTiles), 500);
      }
    },
    [tiles, mode, winner, player1, currentPlayer, onPlay, onCPUPlay],
  );

  return (
    <main className={styles.main}>
      <Suspense>
        <div className={styles.container}>
          <div className={styles.head}>
            <div className={styles["head__logo"]}>
              <Logo />
            </div>

            <TurnBadge currentPlayer={currentPlayer} />

            <div className={styles["head__restart-button"]}>
              <Button variant="icon-only" color="gray" label={<RestartIcon />} onClick={onReset} />
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
                    currentPlayer={currentPlayer}
                    onClick={() => handleOnTileClick(rowIndex, colIndex)}
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
      </Suspense>

      <WinBanner />
    </main>
  );
}
