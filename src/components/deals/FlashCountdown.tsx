import React, { useEffect, useState } from 'react';
import { Timer, Sparkles } from 'lucide-react';
import { formatTimeRemaining } from '../../utils/formatters.ts';

interface FlashCountdownProps {
  title: string;
  initialSecondsRemaining: number;
}

export const FlashCountdown: React.FC<FlashCountdownProps> = ({
  title,
  initialSecondsRemaining,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSecondsRemaining);

  useEffect(() => {
    setSecondsLeft(initialSecondsRemaining);
  }, [initialSecondsRemaining]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const time = formatTimeRemaining(secondsLeft);

  if (time.isEnded) {
    return (
      <div 
        className="flex items-center gap-2.5 px-4 py-3 bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/80 rounded-2xl text-stone-600 dark:text-stone-300 shadow-sm"
        role="status"
        aria-label="Flaş kampaniya başa çatıb"
      >
        <Timer className="w-5 h-5 text-stone-600 dark:text-stone-400 shrink-0" aria-hidden="true" />
        <div>
          <span className="text-xs text-stone-600 dark:text-stone-300 block">{title}</span>
          <span className="font-semibold text-sm text-stone-800 dark:text-stone-200">Kampaniya bitdi</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 p-4 sm:p-5 rounded-2xl shadow-lg shadow-emerald-950/5 dark:shadow-black/40"
      role="timer"
      aria-label={`${title} geri sayım: ${time.hours} saat ${time.minutes} dəqiqə ${time.seconds} saniyə qalıb`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
            {title}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md shrink-0">
          <Sparkles className="w-3 h-3" /> Flaş fürsət
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Hours box */}
        <div className="flex-1 bg-stone-100 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700/60 rounded-xl p-1.5 sm:p-2.5 text-center">
          <span className="block text-lg sm:text-2xl font-extrabold text-stone-900 dark:text-white tabular-nums tracking-tight">
            {time.hours}
          </span>
          <span className="block text-[9px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
            saat
          </span>
        </div>

        <span className="text-base sm:text-lg font-bold text-stone-400 dark:text-stone-600 select-none">:</span>

        {/* Minutes box */}
        <div className="flex-1 bg-stone-100 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700/60 rounded-xl p-1.5 sm:p-2.5 text-center">
          <span className="block text-lg sm:text-2xl font-extrabold text-stone-900 dark:text-white tabular-nums tracking-tight">
            {time.minutes}
          </span>
          <span className="block text-[9px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
            dəqiqə
          </span>
        </div>

        <span className="text-base sm:text-lg font-bold text-stone-400 dark:text-stone-600 select-none">:</span>

        {/* Seconds box */}
        <div className="flex-1 bg-stone-100 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700/60 rounded-xl p-1.5 sm:p-2.5 text-center">
          <span className="block text-lg sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400 tabular-nums tracking-tight">
            {time.seconds}
          </span>
          <span className="block text-[9px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
            saniyə
          </span>
        </div>
      </div>
    </div>
  );
};
