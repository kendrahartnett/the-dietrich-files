import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="cinzel-decorative-bold text-3xl text-secondary-content">
        No Such File
      </h1>
      <p className="cormorant-garamond mt-4 text-lg text-base-content/75">
        This page was never part of the archive, or it has been lost to
        time along with everything else that doesn't survive over centuries.
      </p>
      <Link
        to="/"
        className="btn btn-primary mt-8 jim-nightshade-regular text-lg"
      >
        Return to the archive
      </Link>
    </div>
  );
}