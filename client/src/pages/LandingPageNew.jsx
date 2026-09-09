import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const archive = [
  {
    to: '/stories',
    label: 'Memiors',
    detail:
      'Private entries, transcribed exactly as they were written, spanning more than a century.',
  },
  {
    to: '/music',
    label: 'Music',
    detail:
      'Recordings and compositions etched in time, each note carrying an echo from a life that refused to fade.',
  },
  {
    to: '/gallery',
    label: 'Art',
    detail:
      'Portraits and illustrations, rendered by a hand that has had a very long time to practice.',
  },
];

// Add this near the top of the file, outside the component
const grainDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(%23n)'/>
  </svg>`
)}`;

const crackPath =
  '50% 0%, 44% 12%, 56% 24%, 42% 38%, 58% 52%, 44% 66%, 56% 80%, 50% 100%';

export default function LandingPageNew() {
  const [unsealing, setUnsealing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [revealed]);

  function breakSeal() {
    if (unsealing) return;
    setUnsealing(true);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const delay = reduceMotion ? 0 : 1100;
    // const delay = reduceMotion ? 0 : 700;

    timeoutRef.current = setTimeout(() => setRevealed(true), delay);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-200 text-base-content">
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="fog-layer-a absolute -left-1/4 top-0 h-[60vh] w-[60vh] rounded-full bg-primary/20 blur-3xl"
        />
        <div
          className="fog-layer-b absolute -right-1/4 bottom-0 h-[55vh] w-[55vh] rounded-full bg-secondary-content/10 blur-3xl"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, oklch(3.8% 0 360 / 0.6) 100%)',
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center px-6 pt-24 pb-16 text-center">
        <h1 className="cinzel-decorative-black text-4xl tracking-wide text-secondary-content sm:text-5xl">
          The Dietrich Files
        </h1>

        <p className="jim-nightshade-regular mt-4 text-2xl text-accent-content/80">
          for those who already know his name
        </p>

        <div className="cormorant-garamond mt-8 max-w-md text-lg leading-relaxed text-base-content/85">
          <p>
            There are worlds that exist only in memory, whispered from one
            generation to the next. This one was left behind, sealed, for
            whoever finds their way to it.
          </p>
        </div>





        {/* Wax seal entry */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={breakSeal}
            aria-expanded={revealed}
            aria-controls="archive-preview"
            disabled={unsealing}
            className={`group relative h-32 w-32 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-content focus-visible:ring-offset-4 focus-visible:ring-offset-base-200 ${
              unsealing ? 'seal-unsealing' : ''
            }`}
          >
            <span
              className="seal-half seal-half-left absolute inset-0 overflow-hidden rounded-full"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            >
              <span className="block h-full w-full bg-accent shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]" />
            </span>
            <span
              className="seal-half seal-half-right absolute inset-0 overflow-hidden rounded-full"
              style={{ clipPath: 'inset(0 0 0 50%)' }}
            >
              <span className="block h-full w-full bg-accent shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]" />
            </span>

            <span
              aria-hidden="true"
              className="seal-crack absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2 bg-accent-content/70 transition-opacity group-hover:opacity-70"
            />

            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full p-8 text-accent-content/90 transition-transform duration-300 group-hover:scale-105"
            >
              <path
                d="M50 20 C40 30 30 35 30 50 C30 65 40 72 50 80 C60 72 70 65 70 50 C70 35 60 30 50 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M50 34 C46 40 42 42 42 50 C42 58 46 62 50 66"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <p className="special-elite-regular text-xs tracking-wide text-base-content/60">
            press the seal to enter
          </p>
        </div>
      </section>

      {/* Revealed archive ledger */}
      {revealed && (
        <section
          id="archive-preview"
          className={`archive-reveal relative mx-auto max-w-xl px-6 pb-24 ${
            visible ? 'is-visible' : ''
          }`}
        >
          <ul className="divide-y divide-base-300">
            {archive.map((item) => (
              <li key={item.to} className="py-6">
                <Link to={item.to} className="group block">
                  <span className="cinzel-decorative-bold text-lg text-secondary-content transition-colors group-hover:text-accent-content">
                    {item.label}
                  </span>
                  <p className="cormorant-garamond mt-2 text-base text-base-content/75">
                    {item.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="relative border-t border-base-300 px-6 py-10 text-center">
        <p className="cormorant-garamond text-sm italic text-base-content/60">
          May every visitor discover something that lingers with them long
          after they leave these pages.
        </p>
      </footer>
    </div>
  );
}