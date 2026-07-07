import { Link } from "react-router";

/**
 * mess_neko wordmark.
 * The badge behind the paw glyph has two small triangular "ears"
 * peeking above it — the one signature shape reused (sparingly)
 * across the marketing pages.
 */
function Logo({ to = "/", size = "md", className = "" }) {
  const sizes = {
    sm: { badge: "w-7 h-7", ear: "w-2 h-2", text: "text-base" },
    md: { badge: "w-9 h-9", ear: "w-2.5 h-2.5", text: "text-xl" },
    lg: { badge: "w-12 h-12", ear: "w-3.5 h-3.5", text: "text-3xl" },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2.5 group ${className}`}
    >
      <span className="relative inline-flex items-center justify-center shrink-0">
        {/* ears */}
        <span
          className={`absolute -top-1.5 -left-1 ${s.ear} bg-primary rounded-sm rotate-45 -z-10 transition-transform group-hover:-translate-y-0.5`}
        />
        <span
          className={`absolute -top-1.5 -right-1 ${s.ear} bg-primary rounded-sm rotate-45 -z-10 transition-transform group-hover:-translate-y-0.5`}
        />
        {/* head */}
        <span
          className={`${s.badge} rounded-2xl bg-primary text-primary-content flex items-center justify-center font-display`}
        >
          <PawIcon className="w-[55%] h-[55%]" />
        </span>
      </span>

      <span className={`font-mono font-semibold tracking-tight ${s.text}`}>
        mess<span className="text-primary">_</span>neko
      </span>
    </Link>
  );
}

export function PawIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <ellipse cx="12" cy="16.2" rx="5.2" ry="4.3" />
      <ellipse cx="4.6" cy="9.4" rx="2.1" ry="2.6" transform="rotate(-18 4.6 9.4)" />
      <ellipse cx="9.4" cy="5.6" rx="2.1" ry="2.7" transform="rotate(-6 9.4 5.6)" />
      <ellipse cx="14.6" cy="5.6" rx="2.1" ry="2.7" transform="rotate(6 14.6 5.6)" />
      <ellipse cx="19.4" cy="9.4" rx="2.1" ry="2.6" transform="rotate(18 19.4 9.4)" />
    </svg>
  );
}

export default Logo;