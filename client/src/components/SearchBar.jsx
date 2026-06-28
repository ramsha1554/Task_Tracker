import { RiSearchLine, RiCloseLine } from 'react-icons/ri';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <RiSearchLine
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--color-muted)' }}
      />
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-8 pr-8 py-2 text-sm bg-paper border border-mid rounded outline-none focus:border-ink placeholder:text-muted transition-colors duration-150"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--color-muted)' }}
        >
          <RiCloseLine size={14} />
        </button>
      )}
    </div>
  );
}