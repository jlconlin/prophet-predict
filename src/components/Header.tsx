'use client';

import {useState} from 'react';

export default function Header(): JSX.Element {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-5 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="m-0 text-3xl md:text-2xl font-semibold text-gray-800 tracking-tight">
              Prophet Predict
            </h1>
            <p className="mt-1 text-base md:text-sm text-gray-500 font-normal">
              Statistical probabilities of succession in The Church of Jesus Christ of Latter-day Saints
            </p>
          </div>
          <button
            className="bg-gray-100 border border-gray-300 rounded-md px-5 py-2 md:px-4 md:py-2 flex items-center gap-2 cursor-pointer text-gray-700 text-base md:text-sm font-medium transition-all duration-200 hover:bg-gray-200 hover:border-gray-400 active:bg-gray-300"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Show methodology information"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
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
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-8 md:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="relative w-full max-w-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-2rem)] animate-fadeInSlow md:animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer z-10"
              onClick={() => setShowInfo(false)}
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-y-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pr-10">
                How This Works
              </h2>

              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What This Calculates
                  </h3>
                  <p className="text-base text-gray-700 leading-normal">
                    The probability that each apostle will serve as President
                    (Prophet) of The Church of Jesus Christ of Latter-Day Saints
                    on any given date over the next 30 years.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How It Works
                  </h3>
                  <p className="text-base text-gray-700 leading-normal mb-4">
                    An apostle becomes President when:
                  </p>
                  <ol className="text-base text-gray-700 leading-normal space-y-2 ml-6 list-decimal">
                    <li>All apostles ordained before them have passed away</li>
                    <li>They are still living</li>
                  </ol>
                  <p className="text-base text-gray-700 leading-normal mt-4">
                    For each apostle, we calculate the probability of both
                    conditions being met for each day over the next 30 years.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Data Sources
                  </h3>
                  <ul className="text-base text-gray-700 leading-normal space-y-2 ml-6 list-disc">
                    <li>
                      <strong>Ordination dates:</strong> Publicly available
                      church records
                    </li>
                    <li>
                      <strong>Birth dates:</strong> Publicly available church
                      records
                    </li>
                    <li>
                      <strong>Mortality data:</strong> Social Security
                      Administration actuarial tables for U.S. males
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Assumptions
                  </h3>
                  <ul className="text-base text-gray-700 leading-normal space-y-2 ml-6 list-disc">
                    <li>Succession follows seniority by ordination date</li>
                    <li>No early resignations or unforeseen circumstances</li>
                    <li>
                      Individual health follows average mortality patterns
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Limitations
                  </h3>
                  <ul className="text-base text-gray-700 leading-normal space-y-2 ml-6 list-disc">
                    <li>
                      Statistical model cannot account for individual health
                      conditions
                    </li>
                    <li>Shows probabilities, not predictions</li>
                    <li>Cannot predict unforeseen circumstances</li>
                  </ul>
                </section>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Last updated:{' '}
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
