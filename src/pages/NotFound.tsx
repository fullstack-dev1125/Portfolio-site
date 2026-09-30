import { Link } from 'react-router-dom';

import { site } from '../config/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle(`Page not found | ${site.name}`);

  return (
    <div className="container-page py-24 text-center md:py-32">
      <h1 className="text-4xl sm:text-5xl">Nothing here, sorry.</h1>
      <p className="mx-auto mt-5 max-w-md text-muted">That page doesn't exist. It's not you, it's the URL.</p>
      <p className="mt-9">
        <Link to="/" className="btn btn-primary">
          Take me home
        </Link>
      </p>
    </div>
  );
}
