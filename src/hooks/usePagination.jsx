import { useState } from "react";

export const usePagination = (initialPage = 1) => { // Add the initialPage parameter
  const [page, setPage] = useState(initialPage); // Initialize the page state with the initialPage
  const [totalPages, setTotalPages] = useState(1); // Initialize the totalPages state with 1

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return {
    page,
    totalPages,
    setPage,
    setTotalPages,
    nextPage,
    prevPage,
  };
};
