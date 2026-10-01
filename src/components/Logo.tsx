import { site } from '../config/site';

/** "KS" mark with the name and a one-line tagline, used in the header and footer. */
export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-mid to-violet-ink text-sm font-extrabold text-white shadow-[0_6px_20px_-6px_rgb(168_85_247/0.8)]"
      >
        KS
      </span>
      <span className="leading-none">
        <span className="block text-[0.95rem] font-extrabold tracking-wide uppercase">{site.shortName}</span>
        <span className="mt-1 block text-[0.62rem] font-semibold tracking-[0.18em] text-muted uppercase">Full-stack engineer</span>
      </span>
    </span>
  );
}
