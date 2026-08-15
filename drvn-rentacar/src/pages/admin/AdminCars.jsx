import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useFleet } from "../../context/FleetContext";
import { CLASSES } from "../../data/cars";
import { LOCATIONS } from "../../data/locations";

const EMPTY = {
  plate: "",
  name: "",
  className: "Compact",
  pricePerDay: "",
  seats: 4,
  transmission: "Manual",
  fuel: "Petrol",
  tag: "",
  rating: 4.5,
  location: LOCATIONS[0].name,
  description: "",
};

export default function AdminCars() {
  const { cars, addCar, updateCar, deleteCar } = useFleet();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);

  function startAdd() {
    setEditingId("new");
    setForm(EMPTY);
  }

  function startEdit(car) {
    setEditingId(car.id);
    setForm(car);
  }

  function closeForm() {
    setEditingId(null);
    setForm(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      pricePerDay: Number(form.pricePerDay),
      seats: Number(form.seats),
      rating: Number(form.rating),
    };
    if (editingId === "new") {
      addCar(payload);
    } else {
      updateCar(editingId, payload);
    }
    closeForm();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Cars</h1>
          <p className="mt-1 text-sm text-inkDim">{cars.length} vehicles in the fleet.</p>
        </div>
        <button onClick={startAdd} className="btn-primary !px-4 !py-2.5 text-xs">
          <Plus size={15} /> Add car
        </button>
      </div>

      {form && (
        <form onSubmit={handleSubmit} className="card mt-6 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">
              {editingId === "new" ? "New car" : "Edit car"}
            </h2>
            <button type="button" onClick={closeForm} className="text-inkDim hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input required className="input" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label">Plate code</label>
              <input required className="input" value={form.plate}
                onChange={(e) => setForm({ ...form, plate: e.target.value })} />
            </div>
            <div>
              <label className="label">Class</label>
              <select className="input" value={form.className}
                onChange={(e) => setForm({ ...form, className: e.target.value })}>
                {CLASSES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c} className="bg-surface2">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Price / day ($)</label>
              <input required type="number" min="1" className="input" value={form.pricePerDay}
                onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} />
            </div>
            <div>
              <label className="label">Seats</label>
              <input required type="number" min="1" max="9" className="input" value={form.seats}
                onChange={(e) => setForm({ ...form, seats: e.target.value })} />
            </div>
            <div>
              <label className="label">Transmission</label>
              <select className="input" value={form.transmission}
                onChange={(e) => setForm({ ...form, transmission: e.target.value })}>
                <option className="bg-surface2">Manual</option>
                <option className="bg-surface2">Automatic</option>
              </select>
            </div>
            <div>
              <label className="label">Fuel</label>
              <select className="input" value={form.fuel}
                onChange={(e) => setForm({ ...form, fuel: e.target.value })}>
                <option className="bg-surface2">Petrol</option>
                <option className="bg-surface2">Diesel</option>
                <option className="bg-surface2">Electric</option>
                <option className="bg-surface2">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="label">Location</label>
              <select className="input" value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}>
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.name} className="bg-surface2">{l.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Tag</label>
              <input className="input" value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="e.g. Best value" />
            </div>
            <div>
              <label className="label">Rating</label>
              <input type="number" min="1" max="5" step="0.1" className="input" value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })} />
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Description</label>
            <textarea rows={3} className="input resize-none" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div className="mt-5 flex gap-3">
            <button type="submit" className="btn-primary">
              {editingId === "new" ? "Add car" : "Save changes"}
            </button>
            <button type="button" onClick={closeForm} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="card mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-inkDim">
              <th className="px-5 py-3 font-medium">Car</th>
              <th className="px-5 py-3 font-medium">Class</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Price / day</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="px-5 py-3">
                  <div className="font-medium">{car.name}</div>
                  <div className="plate text-xs text-inkDim">{car.plate}</div>
                </td>
                <td className="px-5 py-3 text-inkDim">{car.className}</td>
                <td className="px-5 py-3 text-inkDim">{car.location}</td>
                <td className="px-5 py-3 font-mono">${car.pricePerDay}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => startEdit(car)} className="text-inkDim hover:text-amber">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => deleteCar(car.id)} className="text-inkDim hover:text-red-400">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
