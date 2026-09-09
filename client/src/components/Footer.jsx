const foundingYear = 2026;
const repoUrl = "https://github.com/kendrahartnett/the-dietrich-files";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear > foundingYear
      ? `${foundingYear}–${currentYear}`
      : `${foundingYear}`;

  return (
    <footer className="border-t border-base-300 px-6 py-6 text-center">
      <div className="mx-auto max-w-xl">
        <p
          className="text-md italic text-base-content/60"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          May every visitor discover something that lingers with them long after
          they leave these pages.
        </p>
        {/* <p className="cormorant-garamond mt-2 text-sm italic text-base-content/40">
          The archive is still being written.
        </p> */}
      </div>

      <div className="special-elite-regular mt-4 flex flex-col items-center gap-1.5 text-xs tracking-wide text-base-content/40">
        <p>The Dietrich Files @ {foundingYear}</p>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-base-content/70"
        >
          View the source
        </a>
      </div>
    </footer>
  );
}
