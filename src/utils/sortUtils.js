// utils/sortUtils.js
export const sortItems = (items, field, order = "asc") => {
  return [...items].sort((a, b) => {
    if (a[field] < b[field]) return order === "asc" ? -1 : 1;
    if (a[field] > b[field]) return order === "asc" ? 1 : -1;
    return 0;
  });
};
