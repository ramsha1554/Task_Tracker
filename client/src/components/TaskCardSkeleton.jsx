export default function TaskCardSkeleton() {
  return (
    <div className="p-4 rounded border animate-pulse" style={{ borderColor: 'var(--color-mid)' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded shrink-0" style={{ backgroundColor: 'var(--color-mid)' }} />
        <div className="flex-1 space-y-2">
          <div className="h-3 rounded w-3/4" style={{ backgroundColor: 'var(--color-mid)' }} />
          <div className="h-2.5 rounded w-1/2" style={{ backgroundColor: 'var(--color-mid)' }} />
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-14 rounded" style={{ backgroundColor: 'var(--color-mid)' }} />
            <div className="h-5 w-16 rounded" style={{ backgroundColor: 'var(--color-mid)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}