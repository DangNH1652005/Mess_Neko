import { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { PawIcon } from "../components/Logo";

const FAQS = [
  {
    q: "Is mess_neko free?",
    a: "Yes — creating an account and using the core features (messaging, posting, adding friends) is completely free.",
  },
  {
    q: "Can I change the theme anytime?",
    a: "Absolutely. Click the palette icon in the navbar to choose from 30+ themes.",
  },
  {
    q: "Is my data sold to third parties?",
    a: "Never. Your messages and posts are not used for ad targeting.",
  },
];

function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    // TODO: replace with your real submit call (API / email service)
    setTimeout(() => setStatus("sent"), 900);
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <PublicNavbar />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
          <PawIcon className="w-3.5 h-3.5" />
          contact
        </span>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold">
          Got a question? Just say hi.
        </h1>
        <p className="mt-4 text-base-content/70">
          Feedback, bug reports, or just want to share cat photos — we read
          everything.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 grid md:grid-cols-5 gap-8">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-3 rounded-3xl bg-base-200 border border-base-300 p-6 sm:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Your name</span></label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input
                type="email"
                required
                placeholder="hello@example.com"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Subject</span></label>
            <select className="select select-bordered w-full" defaultValue="general">
              <option value="general">General question</option>
              <option value="bug">Bug report</option>
              <option value="feedback">Feature feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Message</span></label>
            <textarea
              required
              rows={5}
              placeholder="Tell us what's on your mind..."
              className="textarea textarea-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={status !== "idle"}
          >
            {status === "sending" && <span className="loading loading-spinner loading-sm" />}
            {status === "sent" ? "Sent! 🐾" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-success">
              Thanks! We'll get back to you within 1–2 business days.
            </p>
          )}
        </form>

        {/* Info cards */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl bg-base-100 border border-base-300 p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-base-content/40">Email</p>
            <p className="mt-1 font-medium">hello@messneko.app</p>
          </div>
          <div className="rounded-2xl bg-base-100 border border-base-300 p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-base-content/40">Response time</p>
            <p className="mt-1 font-medium">Within 1–2 business days</p>
          </div>
          <div className="rounded-2xl bg-base-100 border border-base-300 p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-base-content/40">Social</p>
            <p className="mt-1 font-medium">@mess_neko everywhere</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200 border-y border-base-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((item) => (
              <div key={item.q} className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl">
                <input type="checkbox" />
                <div className="collapse-title font-medium">{item.q}</div>
                <div className="collapse-content text-sm text-base-content/60">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;