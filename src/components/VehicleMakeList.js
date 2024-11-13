import React from "react";

const VehicleMakeList = ({
  makes,
  onEdit,
  onDelete,
  currentPage,
  pageSize,
  setPage,
  sortField,
  sortOrder,
  onSort,
}) => {
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    onSort(field, order);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMakes = makes.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <button onClick={() => handleSort("Name")}>Sort by Name</button>
      <button onClick={() => handleSort("Abrv")}>Sort by Abbreviation</button>

      <ul>
        {paginatedMakes.map((make) => (
          <li key={make.id}>
            {make.Name} ({make.Abrv})
            <button onClick={() => onEdit(make.id)}>Edit</button>
            <button onClick={() => onDelete(make.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={startIndex + pageSize >= makes.length}
      >
        Next
      </button>
    </div>
  );
};

export default VehicleMakeList;
