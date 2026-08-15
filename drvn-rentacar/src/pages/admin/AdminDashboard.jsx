import { Car, CalendarCheck, DollarSign, Users } from "lucide-react";
import { useFleet } from "../../context/FleetContext";
import { useReservations } from "../../context/ReservationsContext";
import { LOCATIONS } from "../../data/locations";

export default function AdminDashboard() {
  const { cars } = useFleet();
  const { reservations } = useReservations();

  const active = reservations.filter((r) => r.status !== "cancelled");
  const revenue = active.reduce((sum, r) => sum + r.total, 0);
  const uniqueUsers = new Set(reservations.map((r) => r.userId)).size;

  const stats = [
    { label: "Cars in fleet", value: cars.length, icon: Car },
    { label: "Active reservations", value: active.length, icon: CalendarCheck },
    { label: "Revenue booked", value: `$${revenue}`, icon: DollarSign },
    { label: "Customers", value: uniqueUsers, icon: Users },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-bold">Overview</h1>
      <p className="mt-1 text-sm text-inkDim">
        A snapshot of the fleet, reservations, and network of {LOCATIONS.length} pickup points.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card rounded-2xl p-5">
            <Icon size={18} className="text-amber" />
            <div className="mt-4 font-mono text-2xl font-medium">{value}</div>
            <div className="mt-1 text-xs text-inkDim">{label}</div>
          </div>
        ))}
      </div>

      <div className="card mt-8 rounded-2xl p-6">
        <h2 className="font-display text-2xl font-semibold">Recent reservations</h2>
        {reservations.length === 0 ? (
          <p className="mt-3 text-sm text-inkDim">No reservations yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-line">
            {reservations.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <span className="font-medium">{r.carName}</span>
                  <span className="ml-2 text-xs text-inkDim">
                    {r.pickupDate} → {r.dropoffDate}
                  </span>
                </div>
                <span className="font-mono text-sm">${r.total}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
