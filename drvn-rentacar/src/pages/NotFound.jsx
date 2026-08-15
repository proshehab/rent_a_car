import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center sm:px-8">
      <span className="font-mono text-8xl font-bold text-line">404</span>
      <h1 className="font-display mt-2 text-3xl font-bold">Wrong turn.</h1>
      <p className="mt-2 text-sm text-inkDim">
        This route doesn't exist. Let's get you back on the road.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
