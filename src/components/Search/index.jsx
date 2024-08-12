import { useState, useEffect } from "react";
import "./Search.css"; // Import the CSS module
import propTypes from "prop-types";

const SearchComponent = ({ onSearch, initialQuery = "" }) => {
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchInput);
    }, 500); // 500ms debounce time

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, onSearch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search characters"
        value={searchInput}
        onChange={handleSearchChange}
        className="searchInput"
      />
    </div>
  );
};

SearchComponent.propTypes = {
  onSearch: propTypes.func.isRequired,
  initialQuery: propTypes.string, // Add this prop to allow initializing with an existing query
};

export default SearchComponent;
