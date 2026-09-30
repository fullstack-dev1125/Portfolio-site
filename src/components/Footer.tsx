import { Link } from 'react-router-dom';

import { phoneHref, site } from '../config/site';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="container-page flex flex-col items-center gap-5 py-10 text-center text-sm">
        <Link
          to={{ pathname: '/', hash: '#top' }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-deep to-blue-deep text-white shadow-[0_0_24px_-4px_rgb(99_102_241/0.9)]"
        >
          <Icon name="arrowUp" className="h-5 w-5" />
          <span className="sr-only">Back to top</span>
        </Link>
        <p className="font-semibold">{site.name}</p>
        <ul className="flex flex-col gap-2 text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
          <li>
            <a className="hover:text-cyan" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <a className="hover:text-cyan" href={`tel:${phoneHref}`}>
              {site.phone}
            </a>
          </li>
          <li>
            {site.address.city}, {site.address.country}
          </li>
        </ul>
        <p className="text-muted">
          &copy; {new Date().getFullYear()} {site.name} ·{' '}
          <Link className="link" to="/legal">
            Legal notice
          </Link>
        </p>
      </div>
    </footer>
  );
}
