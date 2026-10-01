import { highlights } from '../config/site';
import Icon from './Icon';
import Section, { SectionHeading } from './Section';

export default function Highlights() {
  return (
    <Section id="highlights" className="pt-6 md:pt-10">
      <div className="container-page">
        <SectionHeading id="highlights" pill="Beyond the Code" title="Education &" accent="Achievements" intro="Where it started, and what I do for the community outside client work." />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.title} className="reveal">
              <article className="card lift flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-deep/25 text-violet ring-1 ring-violet-mid/30">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base">{item.title}</h3>
                    <p className="text-xs text-muted">{item.meta}</p>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-sm text-[#d4d4d8]">{item.body}</p>
                <p className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm text-muted">
                  {item.label}
                  <Icon name="star" className="h-4 w-4 text-amber-300" />
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
