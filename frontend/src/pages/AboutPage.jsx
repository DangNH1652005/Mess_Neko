import { Link } from "react-router";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { PawIcon } from "../components/Logo";

const VALUES = [
  {
    title: "Warm",
    desc: "We designed mess_neko so every conversation feels comfortable — no pressure to chase likes or trends.",
  },
  {
    title: "Private",
    desc: "Your data is yours. We never sell ads based on your private messages, period.",
  },
  {
    title: "Playful",
    desc: "A bit of cat, a bit of humor — because a fully serious social network is exhausting.",
  },
];

const STATS = [
  { number: "12K+", label: "active members" },
  { number: "2M", label: "messages every month" },
  { number: "32", label: "themes to switch between" },
  { number: "0", label: "annoying ads" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <PublicNavbar />

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
          <PawIcon className="w-3.5 h-3.5" />
          our story
        </span>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-tight">
          A small social network,
          <br /> started by a lazy cat.
        </h1>
        <p className="mt-5 text-base-content/70 text-lg max-w-2xl mx-auto">
          mess_neko started with a group of friends tired of noisy feeds and
          cold algorithms. We wanted to rebuild a small corner of the
          internet where talking to friends feels like sitting next to a cat
          sunbathing: slow, comfortable, and real.
        </p>
      </section>

      {/* STATS */}
      <section className="border-y border-base-300 bg-base-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl sm:text-4xl font-semibold text-primary">
                {s.number}
              </p>
              <p className="mt-1 text-sm text-base-content/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-base-content/40 mb-2">
            Mission
          </p>
          <h2 className="font-display text-3xl font-semibold">
            Real conversations, no performance required.
          </h2>
          <p className="mt-4 text-base-content/70">
            No follower counts, no algorithm pushing outrage to keep you
            scrolling. mess_neko is just a chronological feed, direct
            messages, and the friends you actually chose to connect with.
          </p>
          <Link to="/signup" className="btn btn-primary mt-6">
            Join us
          </Link>
        </div>

        <div className="relative">
          <span className="absolute -top-3 left-8 w-7 h-7 bg-primary rounded-md rotate-45 -z-10" />
          <span className="absolute -top-3 right-8 w-7 h-7 bg-primary rounded-md rotate-45 -z-10" />
          <div className="rounded-3xl bg-base-200 border border-base-300 p-8">
            <p className="font-display text-xl leading-relaxed">
              "We believe one kind conversation is worth more than a million
              views."
            </p>
            <p className="mt-4 text-sm text-base-content/50 font-mono">
              — the mess_neko team
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-base-200 border-y border-base-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-display text-3xl font-semibold text-center">
            What we stand for
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-base-100 border border-base-300 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <PawIcon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-base-content/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">
          Curious to try it out?
        </h2>
        <p className="mt-2 text-base-content/60">
          Creating an account takes less than a minute.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/signup" className="btn btn-primary">Sign up for free</Link>
          <Link to="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;