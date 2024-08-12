import { format } from "date-fns";

// Format date string to "dd-MM-yyyy" format
export const formatDate = (dateString) =>
  format(new Date(dateString), "dd-MM-yyyy");
