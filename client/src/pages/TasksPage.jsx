export default function TasksPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl text-ink mb-8" style={{ fontFamily: 'var(--font-serif)' }}>Tasks</h1>
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>Connected.</p>
      </div>
    </main>
  );
}