import { services } from '../config/site';
import Icon from './Icon';
import Section from './Section';
import { tones } from './tones';

export default function Services() {
  return (
    <Section id="services" title="What I Do" small intro="Four services, all delivered by me personally.">
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const tone = tones[service.color];
          return (
            <li key={service.title} className="reveal glow-card card-lift p-7">
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ${tone.tile}`}>
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className={`mt-5 text-xl ${tone.text}`}>{service.title}</h3>
              <p className="mt-3 text-[0.95rem] text-muted">{service.body}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
