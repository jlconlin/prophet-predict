import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>Calculating prophet probabilities...</p>
    </div>
  );
}
