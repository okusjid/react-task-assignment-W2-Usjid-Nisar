// PaginationControls.js
import React from "react";
import PropTypes from "prop-types";

const PaginationControls = ({ page, totalPages, nextPage, prevPage }) => {
  // Destructure the props object
  return (
    // Add the pagination controls markup
    <div className="paginationContainer">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="paginationButton"
      >
        ← Previous
      </button>
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="paginationButton"
      >
        Next →
      </button>
    </div>
  );
};

// Add prop validation for the PaginationControls component
PaginationControls.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default PaginationControls;
