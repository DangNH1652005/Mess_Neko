import { Link } from "react-router";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { PawIcon } from "../components/Logo";

const GUIDELINES = [
  {
    title: "Be kind",
    desc: "Disagreements happen, but there's no need to be cruel about it. Treat others the way you'd want to be treated in your own group chat.",
  },
  {
    title: "Respect privacy",
    desc: "Don't share someone else's private messages, photos, or personal info without their consent. What happens in a DM stays in the DM.",
  },
  {
    title: "No harassment or hate",
    desc: "Bullying, threats, and hate speech based on race, gender, religion, orientation, or disability are never okay here.",
  },
  {
    title: "No spam or scams",
    desc: "Don't flood feeds with ads, fake giveaways, or phishing links. Keep the feed something people actually want to scroll.",
  },
  {
    title: "Keep it age-appropriate",
    desc: "No explicit sexual content, graphic violence, or anything designed to shock rather than share.",
  },
  {
    title: "Be honest",
    desc: "Don't impersonate other people or brands, and don't spread content you know is false to mislead others.",
  },
];

const ENFORCEMENT = [
  {
    step: "1",
    title: "We review reports",
    desc: "Any post, message, or account can be reported. Our team reviews reports against these guidelines, not just vibes.",
  },
  {
    step: "2",
    title: "We take proportionate action",
    desc: "Depending on severity: a warning, content removal, a temporary limit, or account suspension.",
  },
  {
    step: "3",
    title: "You can appeal",
    desc: "If you think we got it wrong, you can reach out through Contact and we'll take a second look.",
  },
];

function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <PublicNavbar />

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
          <PawIcon className="w-3.5 h-3.5" />
          community guidelines
        </span>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-tight">
          Keep it warm.
          <br /> Keep it real.
        </h1>
        <p className="mt-5 text-base-content/70 text-lg max-w-2xl mx-auto">
          mess_neko only works if it stays a place people actually enjoy
          being in. These guidelines exist to protect that — not to make
          things complicated.
        </p>
      </section>

      {/* GUIDELINES GRID */}
      <section className="bg-base-200 border-y border-base-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
            The basics
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GUIDELINES.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl bg-base-100 border border-base-300 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <PawIcon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold">{g.title}</h3>
                <p className="mt-1.5 text-sm text-base-content/60">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENFORCEMENT — a real ordered process, so numbered steps make sense */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">
            What happens if a rule is broken
          </h2>
          <p className="mt-2 text-base-content/60">
            We try to be fair and consistent, not trigger-happy.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {ENFORCEMENT.map((e) => (
            <div key={e.step} className="relative pl-14">
              <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-display font-semibold">
                {e.step}
              </span>
              <h3 className="font-semibold">{e.title}</h3>
              <p className="mt-1.5 text-sm text-base-content/60">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REPORTING CTA */}
      <section className="bg-base-200 border-y border-base-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">
            Seeing something that breaks these rules?
          </h2>
          <p className="mt-3 text-base-content/60">
            Report it directly from the post or profile, or reach out to us
            if you need help right away.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/contact" className="btn btn-primary">Contact us</Link>
            <Link to="/" className="btn btn-ghost">Back to home</Link>
          </div>
        </div>
      </section>

      {/* NOTE */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center text-xs text-base-content/40">
        <p>
          These guidelines may be updated over time as mess_neko grows.
          Continuing to use the app means you agree to follow the current
          version.
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default CommunityGuidelinesPage;