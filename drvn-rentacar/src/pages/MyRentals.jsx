import { Link } from "react-router-dom";
import { Calendar, MapPin, Ban } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useReservations } from "../context/ReservationsContext";

export default function MyRentals() {
  const { user } = useAuth();
  const { getUserReservations, cancelReservation } = useReservations();
  const rentals = getUserReservations(user.id).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
        Your account
      </span>
      <h1 className="font-display mt-2 text-4xl font-bold sm:text-5xl">My rentals</h1>

      {rentals.length === 0 ? (
        <div className="card mt-8 rounded-2xl p-10 text-center">
          <p className="text-sm text-inkDim">You haven't booked a car yet.</p>
          <Link to="/cars" className="btn-primary mt-5 inline-flex">
            Browse the fleet
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {rentals.map((r) => (
            <div key={r.id} className="card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-semibold">{r.carName}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      r.status === "cancelled"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-teal/10 text-teal"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-inkDim">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {r.pickupLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {r.pickupDate} → {r.dropoffDate}
                  </span>
                  <span>
                    {r.days} day{r.days > 1 ? "s" : ""} × ${r.pricePerDay}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xl">${r.total}</span>
                {r.status !== "cancelled" && (
                  <button
                    onClick={() => cancelReservation(r.id)}
                    className="flex items-center gap-1.5 text-xs text-inkDim hover:text-red-400"
                  >
                    <Ban size={13} /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
