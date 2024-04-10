import { Text } from '@/ui/Text/text';

import styles from './scoreBadge.module.scss';

interface ScoreBadgeProps {
  title: string;
  backgroundColor: string;
  points: number;
}

const ScoreBadge = ({ title, backgroundColor, points }: ScoreBadgeProps) => {
  return (
    <div className={styles['score-badge']} style={{ backgroundColor }}>
      <Text color="dark" content={title} />
      <Text variant="heading" size="medium" color="dark" content={String(points)} />
    </div>
  );
};

export { ScoreBadge };
