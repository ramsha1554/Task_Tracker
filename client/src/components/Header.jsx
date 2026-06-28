export default function Header() {
  return (
    <header className="border-b" style={{ borderColor: "var(--color-mid)", backgroundColor: "var(--color-paper)" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
          Task Tracker
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          Stay organized. Get things done.
        </p>
      </div>
    </header>
  );
}
