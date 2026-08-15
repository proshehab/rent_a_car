import { useState } from "react";
import { Plus, Trash2, MapPin, X } from "lucide-react";
import { LOCATIONS as SEED_LOCATIONS } from "../../data/locations";

export default function AdminLocations() {
  const [locations, setLocations] = useState(SEED_LOCATIONS);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    setLocations((prev) => [
      ...prev,
      { id: `loc-${Date.now()}`, name, address },
    ]);
    setName("");
    setAddress("");
    setAdding(false);
  }

  function handleDelete(id) {
    setLocations((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Locations</h1>
          <p className="mt-1 text-sm text-inkDim">{locations.length} pickup points.</p>
        </div>
        <button onClick={() => setAdding(true)} className="btn-primary !px-4 !py-2.5 text-xs">
          <Plus size={15} /> Add location
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="card mt-6 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">New location</h2>
            <button type="button" onClick={() => setAdding(false)} className="text-inkDim hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">City</label>
              <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">Pickup address</label>
              <input required className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn-primary mt-5">
            Add location
          </button>
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <div key={loc.id} className="card flex items-start justify-between rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-amber" />
              <div>
                <div className="font-medium">{loc.name}</div>
                <div className="mt-0.5 text-xs text-inkDim">{loc.address}</div>
              </div>
            </div>
            <button onClick={() => handleDelete(loc.id)} className="text-inkDim hover:text-red-400">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
