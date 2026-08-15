import { createContext, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
import { CARS as SEED_CARS } from "../data/cars";

const FleetContext = createContext(null);
const KEY = "drvn_fleet";

export function FleetProvider({ children }) {
  const [cars, setCars] = useState(() => readStorage(KEY, SEED_CARS));

  useEffect(() => writeStorage(KEY, cars), [cars]);

  function addCar(car) {
    const newCar = { ...car, id: car.id || `car-${Date.now()}` };
    setCars((prev) => [newCar, ...prev]);
    return newCar;
  }

  function updateCar(id, patch) {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function deleteCar(id) {
    setCars((prev) => prev.filter((c) => c.id !== id));
  }

  function getCarById(id) {
    return cars.find((c) => c.id === id);
  }

  return (
    <FleetContext.Provider value={{ cars, addCar, updateCar, deleteCar, getCarById }}>
      {children}
    </FleetContext.Provider>
  );
}

export function useFleet() {
  const ctx = useContext(FleetContext);
  if (!ctx) throw new Error("useFleet must be used within FleetProvider");
  return ctx;
}
