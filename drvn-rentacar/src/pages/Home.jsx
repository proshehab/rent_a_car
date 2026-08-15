import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Zap, Car } from "lucide-react";
import SearchWidget from "../components/SearchWidget";
import CarCard from "../components/CarCard";
import RouteDivider from "../components/RouteDivider";
import { useFleet } from "../context/FleetContext";

const STEPS = [
  {
    n: "01",
    title: "Choose your car",
    body: "Filter by class, transmission, or fuel type. Every price shown includes insurance — no surprises at the counter.",
    icon: Car,
  },
  {
    n: "02",
    title: "Verify & reserve",
    body: "Create an account once, save it for next time. Reservations lock your rate — cancel free up to 24 hours out.",
    icon: ShieldCheck,
  },
  {
    n: "03",
    title: "Pick up & drive",
    body: "Skip the desk. Head to the pickup point with your reservation and go — average wait time is 9 minutes.",
    icon: Zap,
  },
];

const CITIES = ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Cox's Bazar"];

export default function Home() {
  const { cars } = useFleet();
  const featured = cars.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/25 bg-amber/10 px-3 py-1 text-[11px] font-medium text-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              {cars.length} cars live right now
            </span>

            <h1 className="font-display mt-5 text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Book a car in the
              <br />
              time it takes to
              <br />
              <span className="text-amber">park one.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-inkDim">
              No counters, no paperwork queue. Compare real cars at real
              pickup points near you, lock a rate, and drive off.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
              <div>
                <div className="font-mono text-2xl font-medium">{cars.length}</div>
                <div className="mt-1 text-xs text-inkDim">cars nearby</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-medium">
                  4.8<span className="text-inkDim">/5</span>
                </div>
                <div className="mt-1 text-xs text-inkDim">avg. rating</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-medium">9 min</div>
                <div className="mt-1 text-xs text-inkDim">avg. pickup</div>
              </div>
            </div>
          </div>

          <SearchWidget />
        </div>
      </section>

      <div className="mt-16">
        <RouteDivider />
      </div>

      {/* FLEET PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
              The fleet
            </span>
            <h2 className="font-display mt-2 text-4xl font-bold sm:text-5xl">
              Four classes. One rate you can trust.
            </h2>
          </div>
          <Link
            to="/cars"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-inkDim hover:text-white sm:flex"
          >
            View all cars <ChevronRight size={14} />
          </Link>
        </div>

        <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <RouteDivider />

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
          The process
        </span>
        <h2 className="font-display mt-2 max-w-xl text-4xl font-bold sm:text-5xl">
          Three steps between you and the driver's seat.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
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

      {/* CITIES */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="card rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold">
                Available in 6 cities and counting
              </h3>
              <p className="mt-2 text-sm text-inkDim">
                New pickup points are added every month.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-line bg-surface2 px-3.5 py-1.5 text-xs font-medium text-inkDim"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-amber px-8 py-12 sm:px-14 sm:py-16">
          <h3 className="font-display max-w-md text-4xl font-bold leading-[0.95] text-bg sm:text-5xl">
            Your next car is closer than you think.
          </h3>
          <p className="mt-3 max-w-sm text-sm text-bg/70">
            Create a free account and get your first rental 20% off — it's
            already applied at checkout.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-bg px-5 py-3 text-sm font-semibold text-white"
          >
            Get started <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
