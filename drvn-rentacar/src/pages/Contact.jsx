import { useState } from "react";
import { Mail, Phone, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // No backend wired up yet — swap this for an API call or Firebase write.
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
        Support
      </span>
      <h1 className="font-display mt-2 text-4xl font-bold sm:text-5xl">
        Talk to the team.
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-amber" />
            <div>
              <div className="text-sm font-medium">Email</div>
              <div className="text-sm text-inkDim">support@drvn.app</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-amber" />
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div className="text-sm text-inkDim">+880 1234 567 890</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-amber" />
            <div>
              <div className="text-sm font-medium">Headquarters</div>
              <div className="text-sm text-inkDim">Dhaka, Bangladesh</div>
            </div>
          </div>
        </div>

        <div className="card rounded-2xl p-6 sm:p-7">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 size={32} className="text-teal" />
              <h3 className="font-display mt-4 text-2xl font-semibold">Message sent</h3>
              <p className="mt-2 text-sm text-inkDim">
                We usually reply within one business day.
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary mt-6">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send message <ChevronRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
