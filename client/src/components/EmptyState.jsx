import { RiInboxLine, RiFilterOffLine } from 'react-icons/ri';
import Button from './Button';

export default function EmptyState({ message = 'No tasks yet.', filtered = false, onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {filtered ? (
        <RiFilterOffLine size={40} style={{ color: 'var(--color-mid)', marginBottom: '0.75rem' }} />
      ) : (
        <RiInboxLine size={40} style={{ color: 'var(--color-mid)', marginBottom: '0.75rem' }} />
      )}
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{message}</p>
      {filtered && onClearFilters && (
        <div className="mt-4">
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}