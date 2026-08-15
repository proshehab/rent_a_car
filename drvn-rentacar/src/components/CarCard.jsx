import { Link } from "react-router-dom";
import { Car, Users, Gauge, Fuel, Star } from "lucide-react";

export default function CarCard({ car }) {
  return (
    <div className="card flex min-w-[270px] flex-1 flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="plate rounded-md border border-line bg-surface2 px-2.5 py-1 text-xs font-semibold text-amber">
          {car.plate}
        </span>
        <span className="text-[11px] text-inkDim">{car.tag}</span>
      </div>

      <div className="my-6 flex h-24 items-center justify-center rounded-xl bg-surface2">
        <Car size={44} strokeWidth={1.3} className="text-inkDim" />
      </div>

      <h3 className="font-display text-2xl font-semibold leading-tight">{car.name}</h3>
      <div className="mt-1 flex items-center gap-1 text-xs text-inkDim">
        <Star size={12} className="fill-amber text-amber" />
        {car.rating} · {car.className} · {car.location}
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-xs text-inkDim">
        <span className="flex items-center gap-1"><Users size={13} /> {car.seats}</span>
        <span className="flex items-center gap-1"><Gauge size={13} /> {car.transmission}</span>
        <span className="flex items-center gap-1"><Fuel size={13} /> {car.fuel}</span>
      </div>

      <div className="mt-5 flex flex-1 items-end justify-between">
        <div>
          <span className="font-mono text-2xl font-medium">${car.pricePerDay}</span>
          <span className="text-xs text-inkDim"> / day</span>
        </div>
        <Link to={`/cars/${car.id}`} className="btn-secondary !px-3 !py-2 text-xs">
          Reserve
        </Link>
      </div>
    </div>
  );
}
