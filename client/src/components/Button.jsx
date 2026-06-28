export default function Button({ children, variant = 'primary', type = 'button', onClick, disabled }) {
  const base = 'px-4 py-2 text-sm font-semibold rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-signal text-white hover:bg-signal/90',
    secondary: 'bg-paper text-ink border-2 border-mid hover:border-muted',
    ghost: 'text-muted hover:text-ink hover:bg-mid/40',
    danger: 'bg-paper text-signal border-2 border-signal hover:bg-signal hover:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}