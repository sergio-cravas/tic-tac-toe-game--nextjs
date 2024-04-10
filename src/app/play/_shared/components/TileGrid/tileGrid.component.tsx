import { useContext } from "react";

import { Logo } from "@/ui/Logo/logo";
import { Button } from "@/ui/Button/button";
import { Tile } from "../Tile/tile.component";
import { RestartIcon } from "@/ui/RestartIcon/restartIcon.component";
import { TurnBadge } from "../TurnBadge/turnBadge.component";
import { ScoreBadge } from "../ScoreBadge/scoreBadge.component";
import { GameContextProps, GameContext } from "@/app/play/_shared/context/gameContext";
import { ScoreContext, ScoreContextProps } from "@/app/play/_shared/context/scoreContext";

import styles from "./tileGrid.module.scss";
import colors from "@/theme/colors.module.scss";

const GRID_ROWS = 3;
const GRID_COLUMNS = 3;

export const TileGrid = () => {
  const { tiles, winningTiles, currentPlayer, onPlay, onReset } = useContext<GameContextProps>(GameContext);
  const { winsByX, winsByO, draws } = useContext<ScoreContextProps>(ScoreContext);

  return (
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
  );
};
