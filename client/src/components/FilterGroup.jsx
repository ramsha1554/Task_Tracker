export default function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>
        {label}
      </p>
      <div className="flex flex-col">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(value === opt.value ? '' : opt.value)}
            className="text-left px-2 py-1.5 text-sm rounded transition-colors duration-150"
            style={{
              color: value === opt.value ? 'var(--color-signal)' : 'var(--color-ink)',
              backgroundColor: value === opt.value ? 'var(--color-mid)' : 'transparent',
              fontWeight: value === opt.value ? '500' : '400',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}