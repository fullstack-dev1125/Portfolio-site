import { ribbons } from '../config/site';

function Band({ words, className, reverse = false }: { words: string[]; className: string; reverse?: boolean }) {
  // Four copies so the strip is always wider than the screen; the animation moves it by half.
  const items = [...words, ...words, ...words, ...words];
  return (
    <div className={`absolute left-1/2 w-[130%] -translate-x-1/2 py-3 sm:py-4 ${className}`}>
      <div className={`ribbon-track ${reverse ? 'reverse' : ''}`}>
        {items.map((word, index) => (
          <span key={index} className="flex items-center text-2xl font-extrabold tracking-[0.12em] whitespace-nowrap uppercase sm:text-4xl">
            <span className="px-5 sm:px-7">{word}</span>
            <span className="text-xl sm:text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two crossing, scrolling bands of words under the hero. Decorative. */
export default function Ribbons() {
  return (
    <div aria-hidden="true" className="relative h-40 overflow-hidden sm:h-56">
      <Band words={ribbons.light} className="top-8 -rotate-[4deg] bg-white text-[#09090b] sm:top-10" />
      <Band words={ribbons.accent} className="top-[4.5rem] rotate-[3deg] bg-violet-deep text-white shadow-[0_20px_60px_-20px_rgb(124_58_237/0.8)] sm:top-[6.5rem]" reverse />
    </div>
  );
}
