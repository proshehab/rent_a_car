import { ShieldCheck, Zap, Car, Clock } from "lucide-react";
import RouteDivider from "../components/RouteDivider";

const STEPS = [
  {
    n: "01",
    title: "Choose your car",
    body: "Filter the fleet by class, transmission, or fuel type. Every listed price already includes insurance.",
    icon: Car,
  },
  {
    n: "02",
    title: "Verify & reserve",
    body: "Create an account once — it's saved for next time. Reservations lock your rate and cancel free up to 24 hours out.",
    icon: ShieldCheck,
  },
  {
    n: "03",
    title: "Pick up & drive",
    body: "Head to the pickup point with your reservation on hand. Average wait time from arrival to driving off is 9 minutes.",
    icon: Zap,
  },
];

const FAQ = [
  {
    q: "Do I need a credit card to reserve?",
    a: "A valid card is required to confirm any reservation, but you're only charged once the rental period begins.",
  },
  {
    q: "Can I change my pickup date after booking?",
    a: "Yes — from My Rentals you can cancel a booking free of charge up to 24 hours before pickup and rebook new dates.",
  },
  {
    q: "Is insurance included in the daily rate?",
    a: "Every price shown includes standard coverage. Optional add-on coverage is offered at pickup.",
  },
];

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-5 pt-16 text-center sm:px-8">
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
          How it works
        </span>
        <h1 className="font-display mt-3 text-5xl font-bold sm:text-6xl">
          Renting a car, simplified.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-inkDim">
          DRVN cuts the parts of car rental that waste your time — the desk
          queue, the paperwork, the upsell. What's left is a car, a rate, and
          a set of keys.
        </p>
      </section>

      <div className="mt-16">
        <RouteDivider />
      </div>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.n}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-inkDim">{step.n}</span>
                  <div className="h-px flex-1 bg-line" />
                  <Icon size={18} className="text-amber" />
                </div>
                <h3 className="font-display mt-4 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-inkDim">{step.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <RouteDivider />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Common questions</h2>
        <div className="mt-8 divide-y divide-line border-t border-line">
          {FAQ.map((item) => (
            <div key={item.q} className="py-5">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Clock size={14} className="text-amber" /> {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-inkDim">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
