export default function StepCard({ step, isActive, isComplete, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open step ${step.id}: ${step.title}`}
      className={`focus-ring flex min-w-[140px] flex-col items-center border-t-[3px] px-4 py-4 text-center ${
        isComplete
          ? 'border-brand-green bg-green-50/80 text-brand-green dark:bg-green-950/10'
          : isActive
            ? 'border-brand-orange bg-orange-50 text-brand-orange dark:bg-orange-950/20'
            : 'border-transparent text-gray-500 hover:border-brand-saffron hover:bg-orange-50/50 hover:text-brand-orange dark:text-gray-400 dark:hover:bg-orange-950/10'
      }`}
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl dark:bg-surface-darkHover">
        {isComplete ? '✅' : step.icon}
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.18em]">Step {step.id}</span>
      <span className={`mt-2 text-sm ${isActive ? 'font-medium' : 'font-semibold'}`}>{step.title}</span>
    </button>
  );
}
