import { Link } from 'react-router-dom';

import Icon from './Icon';

/** "Start your project" banner between Services and the projects. */
export default function CtaBanner() {
  return (
    <div className="container-page reveal">
      <div className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-line bg-[linear-gradient(120deg,#2a2a30,#1c1726_45%,#2b1748)] p-7 sm:p-12 lg:grid-cols-2">
        <div>
          <p className="pill bg-black/30">Start Your Project</p>
          <h2 className="mt-5 text-3xl sm:text-4xl">Have a Product to Build or a System to Scale?</h2>
          <p className="mt-4 max-w-lg text-[1.05rem] text-[#c4c4cc]">
            A new web app, an API that needs to hold up under load, a monolith that needs splitting, or an AI feature
            to add. I can take it from first schema to production.
          </p>
          <Link to={{ hash: '#contact' }} className="btn btn-light mt-8">
            Get in Touch
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <img
            src="/work/trade-map.webp"
            alt=""
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl border-4 border-white/90 object-cover shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
          />
          <img
            src="/work/routes-dashboard.webp"
            alt=""
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="absolute -bottom-6 -left-4 w-2/5 rounded-lg border-2 border-white/80 shadow-xl sm:-left-8"
          />
          <span className="absolute -right-3 -bottom-4 grid grid-cols-5 gap-1.5">
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-violet" />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
