import { NavLink } from 'react-router-dom';

const links = [
  { to: '/stories', label: 'Journals' },
  { to: '/music', label: 'Music' },
  { to: '/gallery', label: 'Art' },
  { to: '/lore', label: 'Lore' },
];

export default function Navbar() {
  return (
    <nav className="border-b border-base-300 bg-base-200 px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <NavLink
          to="/"
          className="cinzel-decorative-bold text-lg tracking-wide text-secondary-content im-fell"
        >
          Dietrich Black
        </NavLink>

        <ul className="cormorant-garamond flex gap-7 text-lg">
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
      </div>
    </nav>
  );
}