import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import ThemeSelector from "./ThemeSelector";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/community-guidelines", label: "Guidelines" },
  { to: "/contact", label: "Contact" },
];

function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-base-100/80 backdrop-blur border-b border-base-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Logo />

        <div className="hidden md:flex items-center gap-1 font-medium">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeSelector />
          <Link to="/login" className="btn btn-ghost btn-sm hidden sm:inline-flex">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            Sign up
          </Link>

          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-base-300 bg-base-100 px-4 py-3 flex flex-col gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? "text-primary bg-primary/10" : "text-base-content/70"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-lg text-sm font-medium text-base-content/70"
          >
            Log in
          </Link>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default PublicNavbar;