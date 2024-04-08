import { useContext } from "react";

import { Logo } from "@/ui/Logo/logo";
import { Button } from "@/ui/Button/button";
import { Tile } from "../../atoms/Tile/tile.component";
import { RestartIcon } from "@/ui/RestartIcon/restartIcon.component";
import { TurnBadge } from "../../atoms/TurnBadge/turnBadge.component";
import { ScoreBadge } from "../../atoms/ScoreBadge/scoreBadge.component";
import { GameContextProps, GameContext } from "@/app/_shared/context/gameContext";

import styles from './game.module.scss';
import colors from '@/theme/colors.module.scss';

const GRID_ROWS = 3;
const GRID_COLUMNS = 3;

export const Game = () => {
    const { tiles, winningTiles, currentPlayer, onPlay, onReset } = useContext<GameContextProps>(GameContext);

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles['head__logo']}>
                    <Logo />
                </div>

                <TurnBadge currentPlayer={currentPlayer} />

                <div className={styles['head__restart-button']}>
                    <Button variant="icon-only" color="gray" label={<RestartIcon />} onClick={onReset} />
                </div>
            </div>

            <div className={styles.field}>
                {[...Array(GRID_ROWS).keys()].map((rowIndex) => (
                    <div key={`row-${rowIndex}`} className={styles['field-row']}>
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
                <ScoreBadge title="O (CPU)" points={14} backgroundColor={colors.lightBlue} />

                <ScoreBadge title="TIES" points={32} backgroundColor={colors.silver} />

                <ScoreBadge title="X (YOU)" points={11} backgroundColor={colors.lightYellow} />
            </div>
        </div>
    );
}