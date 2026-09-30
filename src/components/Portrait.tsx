import { site } from '../config/site';

type PortraitProps = {
  /** avatar: small circle in the hero. framed: large glowing square in About. */
  variant: 'avatar' | 'framed';
};

/**
 * The portrait. The hero uses its own tight face crop; the About frame picks
 * the 600px or 930px copy of the square crop to suit the screen.
 */
export default function Portrait({ variant }: PortraitProps) {
  const { src, medium, avatar, alt, width, height } = site.photo;

  if (variant === 'avatar') {
    return (
      <div className="mx-auto h-28 w-28 rounded-full bg-gradient-to-br from-pink via-violet to-cyan p-[3px] shadow-[0_0_40px_-6px_rgb(192_132_252/0.8)] sm:h-32 sm:w-32">
        <img
          src={avatar}
          alt={alt}
          width={480}
          height={480}
          fetchPriority="high"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="glow-frame mx-auto aspect-square w-full max-w-xs overflow-hidden bg-panel p-2">
      <img
        src={src}
        srcSet={`${medium} 600w, ${src} 930w`}
        sizes="(min-width: 400px) 304px, calc(100vw - 56px)"
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-full w-full rounded-2xl object-cover object-center"
      />
    </div>
  );
}
