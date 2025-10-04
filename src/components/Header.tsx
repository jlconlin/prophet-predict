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
                This tool calculates each apostle&apos;s probability of being
                the President (Prophet) of The Church of Jesus Christ of
                Latter-day Saints at a given point in time, based on:
              </p>
              <ul>
                <li>
                  <strong>Actuarial life tables:</strong> Mortality data by age
                  from the Social Security Administration (SSA)
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
              <div className={styles.note}>
                <p>
                  <strong>The Formula</strong>
                </p>
                <p>
                  For each apostle, we calculate the probability they will be
                  serving as President on any given day. This requires two
                  conditions to be met:
                </p>
                <p>
                  1. All apostles senior to them (by ordination date) have
                  passed away
                  <br />
                  2. The apostle themselves is still living
                </p>
                <p>
                  The probability is the product of these two independent
                  events, calculated using actuarial data published by the
                  Social Security Administration for each apostle&apos;s age.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h3>Key Assumptions</h3>
              <ul className={styles.list}>
                <li>Succession follows strict seniority by ordination date</li>
                <li>No early resignations or unforeseen circumstances</li>
                <li>
                  Actuarial tables represent average mortality (individual
                  health varies)
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h3>Limitations</h3>
              <ul className={styles.list}>
                <li>Statistical model only - many factors cannot be predicted</li>
                <li>Individual health conditions not accounted for</li>
                <li>Does not predict exact outcomes, only probabilities</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h3>About the Data</h3>
              <p>
                Ordination dates and birth dates are publicly available
                information. Actuarial life tables are based on standard U.S.
                mortality data for males from the Social Security Administration.
              </p>
              <p className={styles.note}>
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
