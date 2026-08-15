import { useReservations } from "../../context/ReservationsContext";

export default function AdminReservations() {
  const { reservations, cancelReservation } = useReservations();
  const sorted = [...reservations].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <h1 className="font-display text-4xl font-bold">Reservations</h1>
      <p className="mt-1 text-sm text-inkDim">{reservations.length} total bookings.</p>

      <div className="card mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-inkDim">
              <th className="px-5 py-3 font-medium">Car</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Dates</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-inkDim">
                  No reservations yet.
                </td>
              </tr>
            ) : (
              sorted.map((r) => (
                <tr key={r.id}>
                  <td className="px-5 py-3 font-medium">{r.carName}</td>
                  <td className="px-5 py-3 text-inkDim">{r.pickupLocation}</td>
                  <td className="px-5 py-3 text-inkDim">
                    {r.pickupDate} → {r.dropoffDate}
                  </td>
                  <td className="px-5 py-3 font-mono">${r.total}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        r.status === "cancelled"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-teal/10 text-teal"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {r.status !== "cancelled" && (
                      <button
                        onClick={() => cancelReservation(r.id)}
                        className="text-xs text-inkDim hover:text-red-400"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
