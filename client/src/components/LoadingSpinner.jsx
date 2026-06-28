export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-5 h-5 border-2 border-mid border-t-muted rounded-full animate-spin" />
    </div>
  );
}