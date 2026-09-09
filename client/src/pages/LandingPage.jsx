import { Link } from "react-router-dom";

const sections = [
  {
    to: "/gallery",
    label: "Artwork Gallery",
    blurb: "Portraits and illustrations, rendered by a hand that has had a very long time to practice.",
  },
  {
    to: "/stories",
    label: "Journal Archive",
    blurb: "Private entries, transcribed exactly as they were written, spanning more than 200 years.",
  },
  {
    to: "/music",
    label: "Music Collection",
    blurb: "Recordings and compositions etched in time, each note carrying an echo from a life that refused to fade.",
  },
  {
    to: "/lore",
    label: "The Artist's Lore",
    blurb: "Dietrich Black, and the world that surrounds him.",
  },
];

function OrnamentalDivider() {
  return (
    <svg
      viewBox="0 0 240 32"
      className="mx-auto h-6 w-48 text-accent-content/70"
      aria-hidden="true"
    >
      <path
        d="M0 16 H90 M150 16 H240"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M105 16 c4 -10 12 -10 15 0 c3 -10 11 -10 15 0"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="120" cy="6" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-16 pb-20 text-center">
        <h1 className="text-4xl sm:text-6xl text-primary-content im-fell">
          Dietrich Black
        </h1>

        <p className="mt-4 max-w-xl text-lg sm:text-xl italic text-base-content/80 jim-nightshade-regular">
          &ldquo; Some stories are written in ink. Others are written in blood.  &rdquo;
          
          {/* for those who already know his name */}
        </p>

        <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-base-content/90 cormorant-garamond">

        {/* <p> There are worlds that exist only in memory, whispered from one
            generation to the next. This one was left behind, sealed, for
            whoever finds their way to it.</p> */}
          <p>
            There are worlds that exist only in memory, whispered from one
            generation to the next. Others are born from canvas, music, and the
            written word until they become something greater than imagination
            alone.
          </p>
          <p>
            Whether you have wandered here by chance or returned seeking another
            chapter, welcome. The files await.
          </p>
        </div>

        <Link
          to="/gallery"
          className="btn btn-primary mt-10 px-8 text-base tracking-wide im-fell"
        >
          Enter the archive
        </Link>
      </section>

      <OrnamentalDivider />

      {/* Section teasers */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="group rounded-box border border-base-300 bg-base-100 p-6 transition-colors hover:border-accent-content/60"
          >
            <h2 className="text-2xl text-secondary-content cormorant-garamond font-semibold transition-colors group-hover:text-accent-content/80">
              {s.label}
            </h2>
            <p className="mt-3 text-sm text-base-content/70 cormorant-garamond transition-colors">
              {s.blurb}
            </p>
          </Link>
        ))}
      </section>

      {/* Footer dedication */}
      <footer className="border-t border-base-300 px-6 py-10 text-center">
        <p
          className="text-sm italic text-base-content/60"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          May every visitor discover something that lingers with them long after
          they leave these pages.
        </p>
      </footer>
    </div>
  );
}
