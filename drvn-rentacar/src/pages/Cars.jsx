import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import CarCard from "../components/CarCard";
import { CLASSES } from "../data/cars";
import { useFleet } from "../context/FleetContext";

export default function Cars() {
  const { cars } = useFleet();
  const [searchParams] = useSearchParams();
  const [activeClass, setActiveClass] = useState("All");
  const [sort, setSort] = useState("recommended");

  const location = searchParams.get("location");
  const pickupDate = searchParams.get("pickupDate");
  const dropoffDate = searchParams.get("dropoffDate");

  const filtered = useMemo(() => {
    let list = cars;
    if (activeClass !== "All") {
      list = list.filter((c) => c.className === activeClass);
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cars, activeClass, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
        The fleet
      </span>
      <h1 className="font-display mt-2 text-4xl font-bold sm:text-5xl">
        {filtered.length} cars available
      </h1>
      {location && (
        <p className="mt-2 text-sm text-inkDim">
          Showing cars near <span className="text-ink">{location}</span>
          {pickupDate && dropoffDate ? (
            <>
              {" "}
              for <span className="text-ink">{pickupDate}</span> →{" "}
              <span className="text-ink">{dropoffDate}</span>
            </>
          ) : null}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CLASSES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveClass(c)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeClass === c
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-line bg-surface2 text-inkDim hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-inkDim">
          <SlidersHorizontal size={14} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-line bg-surface2 px-2 py-1.5 text-xs text-ink outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-sm text-inkDim">
          No cars match these filters yet. Try a different class.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
