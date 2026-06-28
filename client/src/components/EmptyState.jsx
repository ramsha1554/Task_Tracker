export default function EmptyState({ message = 'No tasks yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-muted text-sm">{message}</p>
    </div>
  );
}