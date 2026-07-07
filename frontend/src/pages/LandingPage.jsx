import { Link } from "react-router";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { PawIcon } from "../components/Logo";

const FEATURES = [
  {
    icon: ChatIcon,
    title: "Real-time messaging",
    desc: "Smooth conversations with friends, even at 2am while watching cat videos.",
  },
  {
    icon: FeedIcon,
    title: "A cozy feed",
    desc: "Post photos, videos, and moods — and ulet your friends drop a like on your cat's latest nap.",
  },
  {
    icon: PaletteMiniIcon,
    title: "30+ themes",
    desc: "From warm coffee to neon synthwave. Switch themes as fast as a cat changes its mind.",
  },
  {
    icon: BellIcon,
    title: "Never miss a moment",
    desc: "Instant notifications when someone mentions you, likes a post, or sends a new message.",
  },
];

const STEPS = [
  {
    title: "Create an account in 30 seconds",
    desc: "Just an email and a name — no need to declare your cat breed.",
  },
  {
    title: "Add friends & join the community",
    desc: "Find people with your vibe, and maybe your same sleep schedule as a cat.",
  },
  {
    title: "Chat and post at your own pace",
    desc: "Be a little lazy, a little cute, and very much yourself.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <PublicNavbar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
            <PawIcon className="w-3.5 h-3.5" />
            the social app for cat people & real conversations
          </span>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold">
            Chat, post,
            <br />
            and be a{" "}
            <span className="relative inline-block text-primary">
              lazy cat
              <svg
                viewBox="0 0 200 12"
                className="absolute left-0 -bottom-1 w-full h-3 text-primary/40"
                preserveAspectRatio="none"
              >
                <path d="M2 8 C 50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            together.
          </h1>

          <p className="mt-5 text-base-content/70 text-lg max-w-md">
            mess_neko is where you chat with friends, share moments, and find
            warm conversations — like a hug from your favorite cat.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create a free account
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg">
              I already have an account
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-base-content/50">
            <span>🐾 12,000+ members</span>
            <span>💬 2M messages / month</span>
          </div>
        </div>

        {/* Hero visual: chat mockup framed with the ear-notch card */}
        <div className="relative mx-auto w-full max-w-sm">
          <span className="absolute -top-4 left-10 w-8 h-8 bg-primary rounded-md rotate-45 -z-10" />
          <span className="absolute -top-4 right-10 w-8 h-8 bg-primary rounded-md rotate-45 -z-10" />

          <div className="relative rounded-3xl bg-base-100 border border-base-300 shadow-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 pb-3 border-b border-base-300">
              <div className="avatar online">
                <div className="w-8 rounded-full bg-primary/20" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">Boss Cat</p>
                <p className="text-xs text-base-content/50 leading-tight">active now</p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-neutral text-sm">
                  hey, dinner tonight? 🐟
                </div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary text-sm">
                  sure, but let me nap 10 more minutes
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-neutral text-sm">
                  10 minutes = 1 hour, right 😹
                </div>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <span className="loading loading-dots loading-xs text-primary" />
                <span className="text-xs text-base-content/40">typing...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-base-200 border-y border-base-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold">
              Everything you need for a warmer social network
            </h2>
            <p className="mt-2 text-base-content/60">
              No noisy algorithm, no ads breaking your flow — just you and the
              people you actually care about.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl bg-base-100 border border-base-300 p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-base-content/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — paw markers because it is a real, ordered sequence */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-center">
          Get started in 3 steps
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative pl-14">
              <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <PawIcon className="w-5 h-5" />
              </span>
              <p className="text-xs font-mono text-base-content/40 mb-1">
                STEP {i + 1}
              </p>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-base-content/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-base-200 border-y border-base-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="font-display text-2xl sm:text-3xl leading-snug">
            “Since we started using mess_neko, my college group chat is
            busier than my work Slack.”
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="avatar">
              <div className="w-9 rounded-full bg-primary/20" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Linh Dang</p>
              <p className="text-xs text-base-content/50">3rd-year student</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="rounded-3xl bg-primary text-primary-content px-6 sm:px-12 py-14 text-center relative overflow-hidden">
          <span className="absolute -top-3 left-1/2 -translate-x-24 w-8 h-8 bg-primary-content/20 rounded-md rotate-45" />
          <span className="absolute -top-3 left-1/2 translate-x-16 w-8 h-8 bg-primary-content/20 rounded-md rotate-45" />
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Ready to join the herd?
          </h2>
          <p className="mt-3 opacity-80 max-w-md mx-auto">
            Free, takes under a minute, no credit card required.
          </p>
          <Link
            to="/signup"
            className="btn btn-lg bg-base-100 text-base-content hover:bg-base-100/90 border-none mt-7"
          >
            Sign up now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}
function FeedIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 14h5" />
    </svg>
  );
}
function PaletteMiniIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a9 9 0 0 0 0 18c1 0 1.5-.6 1.5-1.4 0-.4-.2-.7-.4-1a1.3 1.3 0 0 1 1-2.2H16a4 4 0 0 0 4-4c0-5-4-9.4-8-9.4Z" />
    </svg>
  );
}
function BellIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export default LandingPage;