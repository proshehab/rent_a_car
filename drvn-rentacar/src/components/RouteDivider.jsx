export default function RouteDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="relative h-6 w-full overflow-hidden">
        <div className="route-line absolute left-0 right-0 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
