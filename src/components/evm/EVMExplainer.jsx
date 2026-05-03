import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TTSButton from '../common/TTSButton';

const evmSteps = [
  'Officer presses Ballot button on Control Unit',
  'Green light on Balloting Unit activates',
  'Voter presses candidate button',
  'Beep confirms vote recorded',
  'VVPAT prints slip, visible for 7 seconds',
  'Slip drops into sealed box',
  'Red light shows — voting complete',
];

const facts = [
  'EVMs have been used in India since 1982',
  'Each EVM can record up to 2000 votes',
  'EVMs are not connected to internet or any network',
  'Battery-powered, no electricity needed at booth',
];

const candidates = ['Candidate 1', 'Candidate 2', 'Candidate 3', 'Candidate 4'];

export default function EVMExplainer() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const explanationText = evmSteps.map((step, index) => `Step ${index + 1}. ${step}`).join('. ');

  return (
    <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{t('evm.title')}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Click the diagram parts or steps to understand how EVM and VVPAT work together.
          </p>
        </div>
        <TTSButton text={explanationText} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left panel — EVM diagram */}
        <div className="rounded-[1.75rem] border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

            {/* Control Unit */}
            <button
              type="button"
              onClick={() => setActiveStep(0)}
              className={`focus-ring flex-1 rounded-[1.5rem] border-2 p-5 text-left transition ${
                activeStep === 0 ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              aria-label="Control Unit — click to see step 1"
            >
              <div className="rounded-2xl bg-gray-300 p-5 dark:bg-gray-700">
                <h3 className="text-lg font-bold">Control Unit</h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Officer&apos;s side</p>
                <div className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow dark:bg-gray-600 dark:text-gray-100">
                  Ballot
                </div>
              </div>
            </button>

            {/* Connecting cable */}
            <div className="hidden items-center lg:flex">
              <div className="h-px w-12 border-t-2 border-dashed border-gray-400" aria-hidden="true" />
            </div>

            {/* Right column — Balloting Unit + VVPAT */}
            <div className="flex flex-1 flex-col gap-4">

              {/* Balloting Unit — changed from button to div to avoid nested buttons */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveStep(1)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveStep(1); } }}
                className={`focus-ring cursor-pointer rounded-[1.5rem] border-2 p-5 text-left transition ${
                  activeStep >= 1 && activeStep <= 3 ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                aria-label="Balloting Unit — click to see step 2"
              >
                <div className="rounded-2xl bg-blue-600 p-5 text-white">
                  <h3 className="text-lg font-bold">Balloting Unit</h3>
                  <p className="mt-1 text-xs text-blue-100">Voter&apos;s side</p>
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className={`inline-block h-3 w-3 rounded-full ${activeStep >= 1 ? 'bg-green-300' : 'bg-white/40'}`} />
                    <span>{activeStep >= 1 ? 'Green light active' : 'Indicator light'}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {candidates.map((label, idx) => (
                      <button
                        key={label}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveStep(2);
                        }}
                        aria-label={`${label} button`}
                        className={`focus-ring rounded-xl px-3 py-3 text-left text-sm transition ${
                          idx === 0 ? 'bg-emerald-500/50 hover:bg-emerald-500/70' :
                          idx === 1 ? 'bg-amber-500/50 hover:bg-amber-500/70' :
                          idx === 2 ? 'bg-rose-500/50 hover:bg-rose-500/70' :
                          'bg-violet-500/50 hover:bg-violet-500/70'
                        }`}
                      >
                        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-white" aria-hidden="true" />
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-blue-100">
                    {activeStep >= 3 ? 'Beep: vote recorded' : 'Press one candidate button'}
                  </div>
                </div>
              </div>

              {/* VVPAT Unit */}
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className={`focus-ring rounded-[1.5rem] border-2 p-5 text-left transition ${
                  activeStep >= 4 ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                aria-label="VVPAT Unit — click to see step 5"
              >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/20">
                  <h3 className="text-lg font-bold">VVPAT Unit</h3>
                  <div className="mt-4 rounded-xl border border-dashed border-amber-300 bg-white p-4 text-sm dark:bg-gray-800">
                    {activeStep >= 4 && activeStep <= 5 ? (
                      <span className="font-semibold text-amber-700 dark:text-amber-300">🧾 Paper slip visible for 7s</span>
                    ) : (
                      <span className="text-gray-500">Paper slip window</span>
                    )}
                  </div>
                  <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                    {activeStep >= 6 ? 'Red light on: voting complete' : 'Slip drops into sealed box after display'}
                  </div>
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* Right panel — Step-by-step explanation */}
        <div className="rounded-[1.75rem] border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
          <h3 className="text-xl font-bold">Step-by-step explanation</h3>
          <div className="mt-5 space-y-3">
            {evmSteps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`focus-ring flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                  activeStep === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                }`}
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white dark:bg-blue-500">
                  {index + 1}
                </span>
                <span className="text-sm font-medium">{step}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Step {activeStep + 1}: {evmSteps[activeStep]}
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20">
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-green-700 dark:text-green-300">
              Did you know?
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
              {facts.map((fact) => (
                <li key={fact} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
