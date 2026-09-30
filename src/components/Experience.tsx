import { background, howIWork } from '../config/site';
import Icon from './Icon';
import Section from './Section';
import { tones } from './tones';

export default function Experience() {
  return (
    <Section id="experience" title="My Experience" emblem="spiral">
      <ol className="relative mx-auto mt-14 max-w-3xl space-y-8 border-l-2 border-line pl-8 sm:pl-10">
        {background.map((item, index) => (
          <li key={item.title} className="reveal relative">
            <span
              aria-hidden="true"
              className={`absolute top-6 -left-[calc(2rem+9px)] h-4 w-4 rounded-full ring-4 ring-bg sm:-left-[calc(2.5rem+9px)] ${index === 0 ? 'bg-cyan shadow-[0_0_14px_#67e8f9]' : index === 1 ? 'bg-pink shadow-[0_0_14px_#f472d0]' : 'bg-violet shadow-[0_0_14px_#c084fc]'}`}
            />
            <article className="glow-card card-lift p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="flex items-start gap-3 text-lg">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-deep text-white">
                    <Icon name="briefcase" className="h-4 w-4" />
                  </span>
                  <span className="text-neon-cool">{item.title}</span>
                </h3>
                <span className="shrink-0 self-start rounded-full border border-line px-3 py-1 text-xs font-semibold text-cyan">{item.period}</span>
              </div>
              <p className="mt-4 text-[0.95rem] text-muted">{item.body}</p>
            </article>
          </li>
        ))}
      </ol>

      <div className="reveal mt-24 text-center">
        <h3 className="text-2xl text-cyan sm:text-3xl">How I Work</h3>
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {howIWork.map((item) => {
          const tone = tones[item.color];
          return (
            <li key={item.title} className="reveal glow-card card-lift flex gap-4 p-6">
              <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white ${tone.tile}`}>
                <Icon name="check" className="h-5 w-5" />
              </span>
              <div>
                <h4 className={`font-bold ${tone.text}`}>{item.title}</h4>
                <p className="mt-1 text-[0.95rem] text-muted">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
