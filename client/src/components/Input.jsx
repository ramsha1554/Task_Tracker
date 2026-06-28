export default function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-ink">{label}</label>
      )}
      <input
        className={`w-full px-3 py-2 text-sm bg-paper border rounded outline-none transition-colors duration-150
          focus:border-ink placeholder:text-muted
          ${error ? 'border-signal' : 'border-mid'}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-signal">{error}</span>
      )}
    </div>
  );
}