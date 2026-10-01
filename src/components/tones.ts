import type { Tone } from '../config/site';

/** Icon tile classes per tone, spelled out in full so Tailwind can see them. */
export const tones: Record<Tone, string> = {
  violet: 'bg-violet-500/15 text-violet-300 ring-violet-400/25',
  teal: 'bg-teal-500/15 text-teal-300 ring-teal-400/25',
  blue: 'bg-sky-500/15 text-sky-300 ring-sky-400/25',
  rose: 'bg-rose-500/15 text-rose-300 ring-rose-400/25',
  amber: 'bg-amber-500/15 text-amber-300 ring-amber-400/25',
  green: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/25',
};
