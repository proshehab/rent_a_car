import { Link } from "react-router-dom";
import { Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-amber">
              <Car size={13} color="#0E1117" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold">DRVN</span>
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-inkDim">
            <Link to="/cars" className="transition-colors hover:text-white">Fleet</Link>
            <Link to="/about" className="transition-colors hover:text-white">How it works</Link>
            <Link to="/contact" className="transition-colors hover:text-white">Support</Link>
            <span>Terms</span>
            <span>Privacy</span>
          </div>

          <span className="text-xs text-inkDim">© 2026 DRVN</span>
        </div>
      </div>
    </footer>
  );
}
