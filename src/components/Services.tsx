import { Link } from 'react-router-dom';

import { services } from '../config/site';
import Icon from './Icon';
import Section, { SectionHeading } from './Section';
import { tones } from './tones';

export default function Services() {
  return (
    <Section id="services">
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 -z-10 h-96 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-white/[0.03] blur-[100px]" />
      <div className="container-page">
        <SectionHeading id="services" pill="Services" title="What I" accent="Offer" intro="End-to-end engineering, from the database to the interface, tailored to what your product needs." />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.title} className={`reveal relative ${index % 2 ? 'lg:top-5' : ''}`}>
              <article className="card lift flex h-full flex-col p-5">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${tones[service.tone]}`}>
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[1.05rem]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{service.body}</p>
                <Link to={{ hash: '#contact' }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-violet">
                  Let's talk<span className="sr-only"> about {service.title}</span>
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <p className="reveal mt-16 text-center">
          <Link to={{ hash: '#contact' }} className="btn btn-light">
            Start a Project
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </Section>
  );
}
