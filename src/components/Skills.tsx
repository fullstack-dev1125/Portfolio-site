import { facts, skills, techCloud } from '../config/site';
import Icon, { type IconName } from './Icon';
import Section from './Section';
import { tones } from './tones';

const groupIcons: IconName[] = ['code', 'server', 'cloud'];
const cloudTones = ['text-cyan', 'text-pink', 'text-violet', 'text-green', 'text-orange', 'text-blue'];
const cloudTilt = ['-rotate-2', 'rotate-1', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3'];

export default function Skills() {
  return (
    <Section id="skills" title="My Skills" emblem="wave">
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {skills.map((group, index) => {
          const tone = tones[group.color];
          return (
            <li key={group.title} className="reveal glow-card card-lift p-6">
              <h3 className="flex items-center gap-3 text-lg">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-white ${tone.tile}`}>
                  <Icon name={groupIcons[index] ?? 'code'} className="h-5 w-5" />
                </span>
                <span className={tone.text}>{group.title}</span>
              </h3>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <li key={item} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-bg/60 px-2 py-3 text-center text-sm font-medium">
                    <span aria-hidden="true" className={`flex h-8 w-8 items-center justify-center rounded-lg border ${tone.border} text-xs font-bold ${tone.text}`}>
                      {item.replace(/[^A-Za-z]/g, '').slice(0, 2)}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      <div className="reveal mt-20 text-center">
        <h3 className="text-2xl text-cyan sm:text-3xl">Tech Universe</h3>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-4">
          {techCloud.map((tech, index) => (
            <li
              key={tech}
              className={`rounded-xl border border-line bg-card-2 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_-6px_rgb(192_132_252/0.6)] ${cloudTones[index % cloudTones.length]} ${cloudTilt[index % cloudTilt.length]} ${index % 2 ? 'sm:translate-y-3' : ''}`}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal mt-20 text-center">
        <h3 className="text-2xl text-cyan sm:text-3xl">Quick Facts</h3>
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.label} className="glow-card card-lift flex flex-col items-center p-5">
              <span className={`text-3xl font-extrabold ${tones[fact.color].text}`}>{fact.value}</span>
              <span className="mt-2 text-sm text-muted">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
