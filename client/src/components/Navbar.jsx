import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/stories', label: 'Journals' },
  { to: '/music', label: 'Music' },
  { to: '/gallery', label: 'Art' },
  { to: '/lore', label: 'Lore' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-base-300 bg-base-200 px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <NavLink
          to="/"
          className="cinzel-decorative-bold text-xl tracking-wide text-primary-content im-fell"
          onClick={() => setOpen(false)}
        >
          Dietrich Black
        </NavLink>

        {/* Desktop links */}
        <ul className="cormorant-garamond hidden gap-7 text-lg sm:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-accent-content'
                    : 'text-base-content/70 transition-colors hover:text-base-content'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`h-px w-6 bg-base-content transition-transform ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-6 bg-base-content transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-px w-6 bg-base-content transition-transform ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <ul
          id="mobile-nav"
          className="cormorant-garamond mt-4 flex flex-col gap-4 border-t border-base-300 pt-4 text-lg sm:hidden"
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-accent-content'
                    : 'text-base-content/70 transition-colors hover:text-base-content'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}