// utils/filterUtils.js
export const filterItems = (items, filterText, fields) => {
  const lowerCaseFilter = filterText.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => item[field].toLowerCase().includes(lowerCaseFilter))
  );
};
