import type { CodeSample } from '../config/site';

/**
 * Light syntax colouring, good enough for the short samples in site.ts:
 * comments, strings, keywords and numbers. Everything else stays plain.
 */
const token =
  /(\/\/.*$|#(?!\{).*$|--.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(export|const|function|return|async|await|def|if|is|None|raise|describe|it|expect|CREATE|TABLE|INDEX|ON|PRIMARY|KEY|NOT|NULL|REFERENCES|DEFAULT|CHECK|on|jobs|steps|uses|run|runs-on)\b|\b(\d+)\b/g;

const colours = ['text-dim italic', 'text-emerald-300', 'text-violet', 'text-amber-300'];

function Line({ text }: { text: string }) {
  const parts: { text: string; className?: string }[] = [];
  let last = 0;
  for (const match of text.matchAll(token)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: text.slice(last, index) });
    const group = match.slice(1).findIndex(Boolean);
    parts.push({ text: match[0], className: colours[group] });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });

  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className={part.className}>
          {part.text}
        </span>
      ))}
    </>
  );
}

export default function CodeWindow({ sample }: { sample: CodeSample }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#0b0a10]/85 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.9)] backdrop-blur">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="truncate font-mono text-xs text-muted">{sample.file}</span>
      </div>
      <pre className="no-scrollbar overflow-x-auto px-4 py-3 font-mono text-[0.72rem] leading-[1.7] text-[#e4e4e7] sm:text-[0.78rem]">
        <code>
          {sample.lines.map((line, i) => (
            <span key={i} className="block whitespace-pre">
              <span className="mr-4 inline-block w-4 text-right text-white/20 select-none">{i + 1}</span>
              <Line text={line} />
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
