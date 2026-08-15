# DRVN — Car Rental App

A car-rental web app built with **React**, **Tailwind CSS**, and **React Router**,
in the spirit of [rentacar-reactjs.vercel.app](https://rentacar-reactjs.vercel.app/):
browse a fleet, reserve a car, manage your rentals, and an admin panel to manage
cars, locations, and reservations.

This version ships with **mock data and localStorage** instead of Firebase, so it
runs standalone with `npm install && npm run dev` — no backend setup required.
The context layer (`AuthContext`, `FleetContext`, `ReservationsContext`) is written
so you can swap the localStorage calls for real API/Firebase calls later without
touching any page components.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. To build for production:

```bash
npm run build
npm run preview
```

## Demo accounts

- **Admin:** `admin@drvn.app` / `admin123` — unlocks `/admin`
- Or register any new account from `/register` — it becomes a regular user.

## Project structure

```
src/
├── App.jsx                    # Routes + context providers
├── main.jsx                   # Entry point
├── index.css                  # Tailwind + shared utility classes (.card, .btn-primary, etc.)
│
├── components/
│   ├── Layout.jsx              # Navbar + Footer wrapper (rendered via <Outlet />)
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SearchWidget.jsx        # Hero search console → navigates to /cars with query params
│   ├── CarCard.jsx             # Shared fleet card used on Home + Cars
│   ├── RouteDivider.jsx        # Signature dashed "road line" section divider
│   └── ProtectedRoute.jsx      # Route guard (login required / adminOnly)
│
├── context/
│   ├── AuthContext.jsx          # Mock sign up / login / session (localStorage)
│   ├── FleetContext.jsx         # Car inventory, editable from /admin/cars
│   └── ReservationsContext.jsx  # Bookings: create / cancel / list by user
│
├── data/
│   ├── cars.js                 # Seed fleet data + car classes
│   └── locations.js            # Seed pickup locations
│
├── pages/
│   ├── Home.jsx                 # Hero, search, fleet preview, how it works, CTA
│   ├── Cars.jsx                  # Fleet listing with class/sort filters
│   ├── CarDetails.jsx            # Car detail + booking form
│   ├── Login.jsx / Register.jsx
│   ├── MyRentals.jsx             # Logged-in user's bookings (cancel supported)
│   ├── About.jsx                  # How it works + FAQ
│   ├── Contact.jsx                # Support form (mock submit)
│   ├── NotFound.jsx
│   └── admin/
│       ├── AdminLayout.jsx         # Sidebar nav for /admin/*
│       ├── AdminDashboard.jsx      # Stats overview
│       ├── AdminCars.jsx           # Add / edit / delete fleet cars
│       ├── AdminLocations.jsx      # Add / delete pickup locations
│       └── AdminReservations.jsx   # View / cancel any booking
│
└── utils/
    └── storage.js               # localStorage read/write helpers
```

## Routes

| Path                  | Access      | Purpose                                         |
| ---------------------- | ----------- | ------------------------------------------------ |
| `/`                     | Public      | Home / hero / search                              |
| `/cars`                 | Public      | Fleet listing                                     |
| `/cars/:id`             | Public      | Car detail + reserve (login prompts if needed)    |
| `/login`, `/register`   | Public      | Auth                                               |
| `/my-rentals`           | Logged in   | User's bookings                                    |
| `/about`, `/contact`    | Public      | Info pages                                         |
| `/admin`                | Admin only  | Dashboard overview                                 |
| `/admin/cars`           | Admin only  | Fleet CRUD                                         |
| `/admin/locations`      | Admin only  | Pickup point management                            |
| `/admin/reservations`   | Admin only  | All bookings, cancel any                            |

## Next steps if you productionize this

- Swap `context/*` localStorage calls for a real API or Firebase (Auth + Firestore).
- Add payment on checkout in `CarDetails.jsx`.
- Add image uploads for cars in `AdminCars.jsx` instead of the icon placeholder.
- Add pagination/search to `AdminReservations.jsx` and `Cars.jsx` once data grows.
