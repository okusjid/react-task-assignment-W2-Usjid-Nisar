import { useState, useEffect } from "react";
import "./Search.css"; // Import the CSS module
import propTypes from "prop-types";

const SearchComponent = ({ onSearch, initialQuery = "" }) => { // Add the initialQuery prop with a default value
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchInput);
    }, 500); // 500ms debounce time

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout on unmount or re-render
  }, [searchInput, onSearch]);

  const handleSearchChange = (e) => { // Add the handleSearchChange function
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

// Add prop validation for the SearchComponent component
SearchComponent.propTypes = {
  onSearch: propTypes.func.isRequired, // Add prop validation for the onSearch function
  initialQuery: propTypes.string, // Add this prop to allow initializing with an existing query
};

export default SearchComponent;
