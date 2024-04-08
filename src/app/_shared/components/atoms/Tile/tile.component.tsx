import { OIcon } from '@/ui/OIcon/oIcon';
import { XIcon } from '@/ui/XIcon/xIcon';

import styles from './tile.module.scss';
import colors from '@/theme/colors.module.scss';

interface TileProps {
  /**
   * The size of the icon in pixels. By default is 40.
   */
  size?: number;

  /** Current player of the game */
  currentPlayer: 'x' | 'o';

  /**
   * Adds the icon of the player who selected this tile.
   */
  isSelectedBy?: 'x' | 'o';

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
  return (
    <div className={[styles.tile, isWinner && isSelectedBy && styles[`tile--is-winner-${isSelectedBy}`]].join(' ')} onClick={onClick}>
      {isSelectedBy === 'o' && <OIcon size={64} color={isWinner ? colors.semiDarkNavy : undefined} />}
      {isSelectedBy === 'x' && <XIcon size={64} color={isWinner ? colors.semiDarkNavy : undefined} />}
    </div>
  );
};

export { Tile };
