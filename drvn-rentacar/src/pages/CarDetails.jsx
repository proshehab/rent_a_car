import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Car, Users, Gauge, Fuel, Star, MapPin, Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import { useFleet } from "../context/FleetContext";
import { useAuth } from "../context/AuthContext";
import { useReservations } from "../context/ReservationsContext";
import { LOCATIONS } from "../data/locations";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCarById } = useFleet();
  const { user } = useAuth();
  const { createReservation } = useReservations();

  const car = getCarById(id);

  const [pickupLocation, setPickupLocation] = useState(car?.location || LOCATIONS[0].name);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  if (!car) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Car not found</h1>
        <p className="mt-2 text-sm text-inkDim">
          This car may have been removed from the fleet.
        </p>
        <Link to="/cars" className="btn-primary mt-6 inline-flex">
          Back to fleet
        </Link>
      </div>
    );
  }

  const days =
    pickupDate && dropoffDate
      ? Math.max(1, Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / 86400000))
      : 0;
  const total = days * car.pricePerDay;

  function handleReserve(e) {
    e.preventDefault();
    setError("");

    if (!user) {
      navigate("/login", { state: { from: { pathname: `/cars/${id}` } } });
      return;
    }
    if (!pickupDate || !dropoffDate) {
      setError("Choose a pickup and drop-off date.");
      return;
    }
    if (new Date(dropoffDate) <= new Date(pickupDate)) {
      setError("Drop-off must be after pickup.");
      return;
    }

    const reservation = createReservation({
      userId: user.id,
      car,
      pickupLocation,
      pickupDate,
      dropoffDate,
    });
    setConfirmed(reservation);
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
          <CheckCircle2 size={28} className="text-teal" />
        </div>
        <h1 className="font-display mt-6 text-4xl font-bold">Reservation confirmed</h1>
        <p className="mt-3 text-sm text-inkDim">
          Your {car.name} is booked for {confirmed.days} day{confirmed.days > 1 ? "s" : ""} at{" "}
          {confirmed.pickupLocation}. Total: <span className="text-ink">${confirmed.total}</span>
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/my-rentals" className="btn-primary">
            View my rentals
          </Link>
          <Link to="/cars" className="btn-secondary">
            Browse more cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <Link to="/cars" className="text-xs text-inkDim hover:text-white">
        ← Back to fleet
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center justify-between">
            <span className="plate rounded-md border border-line bg-surface2 px-2.5 py-1 text-xs font-semibold text-amber">
              {car.plate}
            </span>
            <span className="flex items-center gap-1 text-xs text-inkDim">
              <Star size={12} className="fill-amber text-amber" /> {car.rating}
            </span>
          </div>

          <div className="my-6 flex h-64 items-center justify-center rounded-2xl border border-line bg-surface2">
            <Car size={96} strokeWidth={1} className="text-inkDim" />
          </div>

          <h1 className="font-display text-4xl font-bold sm:text-5xl">{car.name}</h1>
          <p className="mt-1 text-sm text-inkDim">
            {car.className} · Available in {car.location}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-inkDim">{car.description}</p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6 sm:max-w-md">
            <div>
              <Users size={16} className="text-amber" />
              <div className="mt-2 text-sm font-medium">{car.seats} seats</div>
            </div>
            <div>
              <Gauge size={16} className="text-amber" />
              <div className="mt-2 text-sm font-medium">{car.transmission}</div>
            </div>
            <div>
              <Fuel size={16} className="text-amber" />
              <div className="mt-2 text-sm font-medium">{car.fuel}</div>
            </div>
          </div>
        </div>

        {/* BOOKING PANEL */}
        <div className="card h-fit rounded-2xl p-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-3xl font-medium">${car.pricePerDay}</span>
              <span className="text-sm text-inkDim"> / day</span>
            </div>
            <span className="text-[11px] text-teal">Insurance included</span>
          </div>

          <form onSubmit={handleReserve} className="mt-6 space-y-4">
            <div>
              <label className="label">Pickup location</label>
              <div className="input flex items-center gap-3">
                <MapPin size={16} className="text-amber" />
                <select
                  className="w-full bg-transparent text-sm outline-none"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name} className="bg-surface2">
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Pickup date</label>
                <div className="input flex items-center gap-3">
                  <Clock size={16} className="text-inkDim" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="label">Drop-off date</label>
                <div className="input flex items-center gap-3">
                  <Clock size={16} className="text-inkDim" />
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {days > 0 && (
              <div className="flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-inkDim">
                  {days} day{days > 1 ? "s" : ""} × ${car.pricePerDay}
                </span>
                <span className="font-mono text-lg">${total}</span>
              </div>
            )}

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              {user ? "Confirm reservation" : "Sign in to reserve"}
              <ChevronRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
