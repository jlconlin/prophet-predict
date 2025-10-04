'use client';

import {useState} from 'react';

export default function Header(): JSX.Element {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-5 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="m-0 text-5xl md:text-3xl font-semibold text-gray-800 tracking-tight">
              Prophet Predict
            </h1>
            <p className="mt-1 text-base md:text-xs text-gray-500 font-normal">
              Statistical prediction of LDS Church leadership succession
            </p>
          </div>
          <button
            className="bg-gray-100 border border-gray-300 rounded-md px-5 py-2 md:px-4 md:py-2 flex items-center gap-2 cursor-pointer text-gray-700 text-base md:text-sm font-medium transition-all duration-200 hover:bg-gray-200 hover:border-gray-400 active:bg-gray-300"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center md:items-end z-[1000] py-8 px-8 md:p-0 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl md:rounded-t-2xl md:rounded-b-none p-10 md:p-8 max-w-[650px] w-full max-h-full md:max-h-[90vh] overflow-y-auto overflow-x-hidden relative shadow-2xl animate-fadeInSlow md:animate-slideUp custom-scrollbar">
            <button
              className="absolute top-8 right-8 md:top-6 md:right-6 bg-gray-100 border-none rounded-lg w-8 h-8 text-6xl text-gray-500 cursor-pointer flex items-center justify-center leading-none transition-all duration-200 hover:bg-gray-200 hover:text-gray-800"
              onClick={() => setShowInfo(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="m-0 mb-6 md:mb-5 text-6xl md:text-4xl text-gray-900 font-bold pr-12">
              How This Works
            </h2>

            <section className="mb-8 last:mb-0">
              <h3 className="mt-10 mb-4 md:mt-8 first:mt-0 text-2xl md:text-2xl text-gray-900 font-semibold border-b-2 border-gray-100 pb-2">
                Methodology
              </h3>
              <p className="text-xl leading-relaxed text-gray-600 mb-4">
                This tool calculates each apostle&apos;s probability of being
                the President (Prophet) of The Church of Jesus Christ of
                Latter-day Saints at a given point in time, based on:
              </p>
              <ul className="text-xl leading-relaxed text-gray-600 mb-4 pl-7">
                <li className="mb-3">
                  <strong className="text-gray-900 font-semibold">Actuarial life tables:</strong> Mortality data by age
                  from the Social Security Administration (SSA)
                </li>
                <li className="mb-3">
                  <strong className="text-gray-900 font-semibold">Seniority rules:</strong> The most senior apostle
                  (longest ordained) becomes President
                </li>
                <li className="mb-3">
                  <strong className="text-gray-900 font-semibold">Daily calculations:</strong> Probabilities computed
                  for each day over 30 years
                </li>
              </ul>
              <div className="bg-blue-50 px-6 py-5 rounded-lg border-l-4 border-blue-400 text-lg my-5 text-blue-800">
                <p className="text-xl leading-relaxed text-gray-600 mb-4">
                  <strong className="text-gray-900 font-semibold">The Formula</strong>
                </p>
                <p className="text-xl leading-relaxed text-gray-600 mb-4">
                  For each apostle, we calculate the probability they will be
                  serving as President on any given day. This requires two
                  conditions to be met:
                </p>
                <p className="text-xl leading-relaxed text-gray-600 mb-4">
                  1. All apostles senior to them (by ordination date) have
                  passed away
                  <br />
                  2. The apostle themselves is still living
                </p>
                <p className="text-xl leading-relaxed text-gray-600 mb-4">
                  The probability is the product of these two independent
                  events, calculated using actuarial data published by the
                  Social Security Administration for each apostle&apos;s age.
                </p>
              </div>
            </section>

            <section className="mb-8 last:mb-0">
              <h3 className="mt-10 mb-4 md:mt-8 first:mt-0 text-2xl md:text-2xl text-gray-900 font-semibold border-b-2 border-gray-100 pb-2">
                Key Assumptions
              </h3>
              <ul className="text-xl leading-relaxed text-gray-600 mb-4 pl-7 list-disc">
                <li className="mb-3 list-item">Succession follows strict seniority by ordination date</li>
                <li className="mb-3 list-item">No early resignations or unforeseen circumstances</li>
                <li className="mb-3 list-item">
                  Actuarial tables represent average mortality (individual
                  health varies)
                </li>
              </ul>
            </section>

            <section className="mb-8 last:mb-0">
              <h3 className="mt-10 mb-4 md:mt-8 first:mt-0 text-2xl md:text-2xl text-gray-900 font-semibold border-b-2 border-gray-100 pb-2">
                Limitations
              </h3>
              <ul className="text-xl leading-relaxed text-gray-600 mb-4 pl-7 list-disc">
                <li className="mb-3 list-item">Statistical model only - many factors cannot be predicted</li>
                <li className="mb-3 list-item">Individual health conditions not accounted for</li>
                <li className="mb-3 list-item">Does not predict exact outcomes, only probabilities</li>
              </ul>
            </section>

            <section className="mb-8 last:mb-0">
              <h3 className="mt-10 mb-4 md:mt-8 first:mt-0 text-2xl md:text-2xl text-gray-900 font-semibold border-b-2 border-gray-100 pb-2">
                About the Data
              </h3>
              <p className="text-xl leading-relaxed text-gray-600 mb-4">
                Ordination dates and birth dates are publicly available
                information. Actuarial life tables are based on standard U.S.
                mortality data for males from the Social Security Administration.
              </p>
              <p className="bg-blue-50 px-6 py-5 rounded-lg border-l-4 border-blue-400 text-lg my-5 text-blue-800">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
