import { OIcon } from '@/ui/OIcon/oIcon';
import { XIcon } from '@/ui/XIcon/xIcon';

import styles from './tile.module.scss';

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
   * Click handler
   */
  onClick: () => void;
}

const Tile = ({ isSelectedBy, onClick }: TileProps) => {
  return (
    <div className={styles.tile} onClick={onClick}>
      {isSelectedBy === 'o' && <OIcon size={64} />}
      {isSelectedBy === 'x' && <XIcon size={64} />}
    </div>
  );
};

export { Tile };
