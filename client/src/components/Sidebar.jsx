import SearchBar from './SearchBar';
import FilterGroup from './FilterGroup';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'med', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'dueDate', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
];

export default function Sidebar({ filters, onChange }) {
  return (
    <aside className="flex flex-col gap-6">
      <SearchBar
        value={filters.search}
        onChange={(val) => onChange({ ...filters, search: val })}
      />

      <FilterGroup
        label="Status"
        options={statusOptions}
        value={filters.status}
        onChange={(val) => onChange({ ...filters, status: val })}
      />

      <FilterGroup
        label="Priority"
        options={priorityOptions}
        value={filters.priority}
        onChange={(val) => onChange({ ...filters, priority: val })}
      />

      <FilterGroup
        label="Sort by"
        options={sortOptions}
        value={filters.sort}
        onChange={(val) => onChange({ ...filters, sort: val })}
      />
    </aside>
  );
}