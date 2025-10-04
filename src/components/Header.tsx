'use client';

import {useState} from 'react';
import styles from './Header.module.scss';

export default function Header(): JSX.Element {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <div>
            <h1 className={styles.title}>Prophet Predict</h1>
            <p className={styles.subtitle}>
              Statistical prediction of LDS Church leadership succession
            </p>
          </div>
          <button
            className={styles.infoButton}
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Show methodology information"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>About</span>
          </button>
        </div>
      </header>

      {showInfo && (
        <div className={styles.infoModal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setShowInfo(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h2>How This Works</h2>

            <section className={styles.section}>
              <h3>Methodology</h3>
              <p>
                This tool calculates the probability that each apostle will
                become the next President (Prophet) of The Church of Jesus
                Christ of Latter-day Saints based on:
              </p>
              <ul>
                <li>
                  <strong>Actuarial life tables:</strong> Standard mortality
                  data by age
                </li>
                <li>
                  <strong>Seniority rules:</strong> The most senior apostle
                  (longest ordained) becomes President
                </li>
                <li>
                  <strong>Daily calculations:</strong> Probabilities computed
                  for each day over 30 years
                </li>
              </ul>
              <p className={styles.note}>
                <strong>Formula:</strong> P(apostle becomes prophet on day N) =
                P(all senior apostles deceased) × P(apostle still living)
              </p>
            </section>

            <section className={styles.section}>
              <h3>Key Assumptions</h3>
              <ul>
                <li>Succession follows strict seniority by ordination date</li>
                <li>No early resignations or unforeseen circumstances</li>
                <li>
                  Actuarial tables represent average mortality (individual
                  health varies)
                </li>
                <li>Current apostles remain in their positions</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h3>Historical Context</h3>
              <ul>
                <li>
                  <strong>Average age at appointment:</strong> ~64 years (last 5
                  prophets)
                </li>
                <li>
                  <strong>Average tenure:</strong> ~9 years (last 5 prophets)
                </li>
                <li>
                  <strong>Oldest to serve:</strong> Gordon B. Hinckley (97 at
                  passing)
                </li>
                <li>
                  <strong>Youngest appointed:</strong> Joseph Smith (38 years
                  old)
                </li>
                <li>
                  <strong>Succession rule:</strong> Established in 1844,
                  followed without exception
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h3>Limitations</h3>
              <ul>
                <li>Statistical model only - many factors cannot be predicted</li>
                <li>Individual health conditions not accounted for</li>
                <li>Does not predict exact outcomes, only probabilities</li>
                <li>Future apostle appointments will change projections</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h3>About the Data</h3>
              <p>
                Ordination dates and birth dates are publicly available
                information. Actuarial life tables are based on standard U.S.
                mortality data.
              </p>
              <p className={styles.note}>
                Last updated: October 2025
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
