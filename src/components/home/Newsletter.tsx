import { useState } from "react";
import { TbMail, TbCheck } from "react-icons/tb";

/**
 * Newsletter sign-up. There's no backend yet, so submission is handled
 * locally: a valid email flips the section into a confirmed state. When an
 * API lands, swap the body of handleSubmit for the real request.
 */
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <section className="w-full px-4 py-10 lg:px-8 lg:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-brand-light border border-brand/15 px-6 py-12 lg:px-16 lg:py-16">
          {/* ── Decorative glow ───────────────────────────────────────────── */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />

          <div className="relative max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand text-white">
              <TbMail size={26} />
            </span>

            <h2 className="text-ink text-2xl lg:text-3xl font-black tracking-tight mt-5">
              Stay in the loop
            </h2>
            <p className="text-ink-muted text-sm lg:text-base font-medium mt-2">
              Get new arrivals, exclusive deals, and build tips delivered
              straight to your inbox. No spam — unsubscribe anytime.
            </p>

            {submitted ? (
              <div className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-light text-brand font-bold text-sm">
                <TbCheck size={18} />
                You're subscribed! Check your inbox to confirm.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-7 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="you@example.com"
                    className="w-full h-12 px-4 rounded-xl bg-white text-ink placeholder:text-ink-muted border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-6 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand/90 active:scale-[0.98] transition-all duration-200 shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}

            {error && (
              <p className="text-red-600 text-xs font-medium mt-3">{error}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
