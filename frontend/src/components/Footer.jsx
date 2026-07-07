import { Link } from "react-router";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Logo size="sm" />
          <p className="mt-3 text-sm text-base-content/60 max-w-xs">
            A cozy little social network to chat with friends, share
            moments, and slow down a bit — like a cat sunbathing.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-base-content/40 mb-3">
            Product
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/signup" className="hover:text-primary">Sign up</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-base-content/40 mb-3">
            Support
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/login" className="hover:text-primary">Log in</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-base-content/50">
          <span>© {new Date().getFullYear()} mess_neko. All rights reserved (meow).</span>
          <span className="font-mono">made with 🐾</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;