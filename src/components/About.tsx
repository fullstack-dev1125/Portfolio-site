import { about, site } from '../config/site';
import Icon from './Icon';
import Portrait from './Portrait';
import Section from './Section';

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="reveal mt-12">
        <Portrait variant="framed" />
      </div>

      <div className="reveal glow-card mx-auto mt-12 max-w-3xl space-y-5 p-7 sm:p-10">
        <p>
          I'm <span className="font-semibold text-cyan">{site.name}</span>. I studied Computer Science at the University
          of the Philippines Diliman Extension Program in Pampanga, and I've been building for the web ever since. I've
          worked on {about.industries.slice(0, -1).join(', ')} and {about.industries.at(-1)} products, sometimes as the
          only developer, sometimes as one of many.
        </p>
        <p>
          You talk to me, not an account manager. We agree the scope in writing, I work in small releases you can click
          through, and I tell you early when something looks off.
        </p>
        <p>
          I'm looking for freelance projects with founders and small teams who want one developer they can rely on: a
          new build, Shopify work, or a Laravel app that needs someone to look after it. Ongoing retainers are welcome
          too.
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-5 font-semibold">
          <Icon name="sparkle" className="h-5 w-5 shrink-0 text-pink" />
          <span>{site.yearsExperience} years of experience.</span>
          <span>
            Based in {site.address.city}, {site.address.region}, {site.address.country}.
          </span>
        </p>
      </div>
    </Section>
  );
}
