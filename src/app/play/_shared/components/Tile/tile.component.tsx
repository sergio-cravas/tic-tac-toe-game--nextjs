import { useMemo, useState, useContext } from "react";

import { OIcon } from "@/ui/OIcon/oIcon";
import { XIcon } from "@/ui/XIcon/xIcon";
import { classNames } from "@/functions/classNames";
import { GameContext, GameContextProps } from "@/app/play/_shared/context/gameContext";

import styles from "./tile.module.scss";
import colors from "@/theme/colors.module.scss";
import breakpoints from "@/theme/breakpoints.module.scss";

interface TileProps {
  /**
   * The size of the icon in pixels. By default is 40.
   */
  size?: number;
  /**
   * Current player of the game
   */
  currentPlayer: "x" | "o";
  /**
   * Adds the icon of the player who selected this tile.
   */
  isSelectedBy?: "x" | "o";
  /**
   * Sets a winning state for the tile
   */
  isWinner?: boolean;
  /**
   * Click handler
   */
  onClick: () => void;
}

const Tile = ({ isSelectedBy, isWinner, onClick }: TileProps) => {
  const { winner, currentPlayer } = useContext<GameContextProps>(GameContext);

  const [isHover, setIsHover] = useState<boolean>(false);

  const canShowHover = useMemo(() => !Boolean(winner) && !Boolean(isSelectedBy) && isHover, [isHover, isSelectedBy, winner]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={classNames([styles.tile, Boolean(isWinner && isSelectedBy) && styles[`tile--is-winner-${isSelectedBy}`]])}
    >
      {canShowHover && currentPlayer === "o" && <OIcon className={styles.icon} variant="outline" />}
      {canShowHover && currentPlayer === "x" && <XIcon className={styles.icon} variant="outline" />}

      {isSelectedBy === "o" && <OIcon className={styles.icon} color={isWinner ? colors.semiDarkNavy : undefined} />}
      {isSelectedBy === "x" && <XIcon className={styles.icon} color={isWinner ? colors.semiDarkNavy : undefined} />}
    </div>
  );
};

export { Tile };
