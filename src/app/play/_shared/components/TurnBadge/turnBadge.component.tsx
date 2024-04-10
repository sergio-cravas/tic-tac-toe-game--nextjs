import { Text } from '@/ui/Text/text';
import { OIcon } from '@/ui/OIcon/oIcon';
import { XIcon } from '@/ui/XIcon/xIcon';

import styles from './turnBadge.module.scss';
import colors from '@/theme/colors.module.scss';

interface TurnBadgeProps {
  currentPlayer: 'x' | 'o';
}

const TurnBadge = ({ currentPlayer }: TurnBadgeProps) => {
  return (
    <div className={styles['turn-badge']}>
      {currentPlayer === 'x' ? <XIcon size={20} color={colors.silver} /> : <OIcon size={20} color={colors.silver} />}
      <Text variant="heading" size="extra-small" content="TURN" />
    </div>
  );
};

export { TurnBadge };
