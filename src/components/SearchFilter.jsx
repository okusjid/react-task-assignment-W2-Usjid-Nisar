import React, { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearchChange}
      />
      <select value={filter} onChange={handleFilterChange}>
        <option value="">Filter by</option>
        <option value="homeworld">Homeworld</option>
        <option value="species">Species</option>
        <option value="films">Films</option>
      </select>
    </div>
  );
};

export default SearchFilter;
