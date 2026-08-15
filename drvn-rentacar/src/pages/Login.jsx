import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Car, Mail, Lock, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <Link to="/" className="mx-auto mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-amber">
          <Car size={18} color="#0E1117" strokeWidth={2.5} />
        </div>
        <span className="font-display text-2xl font-bold">DRVN</span>
      </Link>

      <div className="card rounded-2xl p-7">
        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-inkDim">Sign in to manage your reservations.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <div className="input flex items-center gap-3">
              <Mail size={16} className="text-inkDim" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="input flex items-center gap-3">
              <Lock size={16} className="text-inkDim" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Sign in <ChevronRight size={16} />
          </button>
        </form>

        <p className="mt-5 rounded-lg border border-line bg-surface2 px-3 py-2.5 text-xs text-inkDim">
          Demo admin account — <span className="text-ink">admin@drvn.app</span> /{" "}
          <span className="text-ink">admin123</span>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-inkDim">
        New to DRVN?{" "}
        <Link to="/register" className="font-medium text-amber">
          Create an account
        </Link>
      </p>
    </div>
  );
}
