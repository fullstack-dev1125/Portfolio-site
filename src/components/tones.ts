import type { Tone } from '../config/site';

/** Tailwind classes per tone, spelled out in full so Tailwind can see them. */
export const tones: Record<Tone, { tile: string; text: string; border: string }> = {
  blue: { tile: 'bg-blue-deep', text: 'text-blue', border: 'border-blue/40' },
  violet: { tile: 'bg-violet-deep', text: 'text-violet', border: 'border-violet/40' },
  pink: { tile: 'bg-pink-deep', text: 'text-pink', border: 'border-pink/40' },
  orange: { tile: 'bg-orange-deep', text: 'text-orange', border: 'border-orange/40' },
  cyan: { tile: 'bg-cyan-deep', text: 'text-cyan', border: 'border-cyan/40' },
  green: { tile: 'bg-green-deep', text: 'text-green', border: 'border-green/40' },
};
