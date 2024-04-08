import { useContext } from "react";

import { Text } from '@/ui/Text/text';
import { OIcon } from "@/ui/OIcon/oIcon";
import { XIcon } from "@/ui/XIcon/xIcon";
import { Button } from "@/ui/Button/button";
import { GameContextProps, GameContext } from "@/app/_shared/context/gameContext";

import styles from './winBanner.module.scss';

export const WinBanner = () => {
    const { winner, onReset } = useContext<GameContextProps>(GameContext);

    if (!winner) return <></>

    return <div className={styles['win-banner']}>
        <div className={styles['win-banner__background']} />

        <div className={styles['win-banner__banner']}>
            <Text variant="heading" size="extra-small" content='Oh no, you lost' className={styles['win-banner__banner__title']} />

            <div className={styles['win-banner__banner__winner']}>
                {winner === 'o' ? <OIcon /> : winner === 'x' && <XIcon />}
                <Text variant="heading" size="large" color={winner === 'o' ? 'yellow' : winner === 'x' ? 'blue' : undefined} content={winner === 'draw' ? 'Round tied' : 'takes the round'} />
            </div>

            <div className={styles['win-banner__banner__buttons']}>
                <Button color='gray' label="QUIT" onClick={onReset} />

                <Button label="NEXT ROUND" onClick={onReset} />
            </div>
        </div>
    </div>
}