export default function FilterBar({ capacityFilter, onCapacityChange, sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Min. Capacity</label>
        <select
          className="filter-select"
          value={capacityFilter}
          onChange={(e) => onCapacityChange(Number(e.target.value))}
        >
          <option value={0}>Any</option>
          <option value={5}>5+</option>
          <option value={10}>10+</option>
          <option value={15}>15+</option>
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Sort by</label>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="capacity">Capacity</option>
        </select>
      </div>
    </div>
  );
}
