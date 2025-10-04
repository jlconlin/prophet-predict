import styles from './MobileLegend.module.scss';
import {graphDataType} from '@/types';

export default function MobileLegend({
  data,
}: {
  data: graphDataType[];
}): JSX.Element {
  const colors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
    '#aec7e8',
    '#ffbb78',
    '#98df8a',
    '#ff9896',
  ];

  // Sort by ordination date (oldest first)
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.ordinationDate).getTime() -
      new Date(b.ordinationDate).getTime()
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Candidates</h3>
      <div className={styles.legendGrid}>
        {sortedData.map((item) => {
          // Find the original index to get the correct color
          const originalIndex = data.findIndex((d) => d.id === item.id);
          return (
            <div key={item.id} className={styles.legendItem}>
              <div
                className={styles.colorDot}
                style={{
                  backgroundColor: colors[originalIndex % colors.length],
                }}
              />
              <span className={styles.name}>{item.id}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
