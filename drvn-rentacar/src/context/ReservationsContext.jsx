import { createContext, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

const ReservationsContext = createContext(null);
const KEY = "drvn_reservations";

export function ReservationsProvider({ children }) {
  const [reservations, setReservations] = useState(() => readStorage(KEY, []));

  useEffect(() => writeStorage(KEY, reservations), [reservations]);

  function createReservation({ userId, car, pickupLocation, pickupDate, dropoffDate }) {
    const days = Math.max(
      1,
      Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))
    );
    const reservation = {
      id: `res-${Date.now()}`,
      userId,
      carId: car.id,
      carName: car.name,
      carClass: car.className,
      pricePerDay: car.pricePerDay,
      pickupLocation,
      pickupDate,
      dropoffDate,
      days,
      total: days * car.pricePerDay,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [reservation, ...prev]);
    return reservation;
  }

  function cancelReservation(id) {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))
    );
  }

  function getUserReservations(userId) {
    return reservations.filter((r) => r.userId === userId);
  }

  return (
    <ReservationsContext.Provider
      value={{ reservations, createReservation, cancelReservation, getUserReservations }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx) throw new Error("useReservations must be used within ReservationsProvider");
  return ctx;
}
