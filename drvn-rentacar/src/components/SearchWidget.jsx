import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, ChevronRight, ArrowLeftRight } from "lucide-react";
import { LOCATIONS } from "../data/locations";

export default function SearchWidget() {
  const navigate = useNavigate();
  const [sameDrop, setSameDrop] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(LOCATIONS[0].name);
  const [dropLocation, setDropLocation] = useState(LOCATIONS[1].name);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams({
      location: pickupLocation,
      drop: sameDrop ? pickupLocation : dropLocation,
      pickupDate,
      dropoffDate,
    });
    navigate(`/cars?${params.toString()}`);
  }

  return (
    <div className="card rounded-2xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-inkDim">
          Find a car
        </span>
        <button
          type="button"
          onClick={() => setSameDrop((v) => !v)}
          className={`flex items-center gap-1.5 text-xs font-medium ${
            sameDrop ? "text-inkDim" : "text-amber"
          }`}
        >
          <ArrowLeftRight size={13} />
          Different drop-off
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="input flex items-center gap-3">
          <MapPin size={16} className="text-amber" />
          <select
            className="w-full bg-transparent text-sm outline-none"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.name} className="bg-surface2">
                {loc.name} — {loc.address}
              </option>
            ))}
          </select>
        </div>

        {!sameDrop && (
          <div className="input flex items-center gap-3">
            <MapPin size={16} className="text-inkDim" />
            <select
              className="w-full bg-transparent text-sm outline-none"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.name} className="bg-surface2">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="input flex items-center gap-3">
            <Clock size={16} className="text-inkDim" />
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent text-sm outline-none [color-scheme:dark]"
            />
          </div>
          <div className="input flex items-center gap-3">
            <Clock size={16} className="text-inkDim" />
            <input
              type="date"
              required
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-transparent text-sm outline-none [color-scheme:dark]"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary mt-2 w-full">
          Search cars <ChevronRight size={16} />
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-inkDim">
        Free cancellation up to 24 hours before pickup
      </p>
    </div>
  );
}
