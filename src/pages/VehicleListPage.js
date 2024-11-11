import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import vehicleMakeStore from "../stores/VehicleMakeStore";
import VehicleMakeForm from "../components/VehicleMakeForm";
import { useNavigate } from "react-router-dom";

const VehicleListPage = observer(() => {
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  const handleAddVehicleMake = async (formData) => {
    await vehicleMakeStore.addVehicleMake({
      Name: formData.name,
      Abrv: formData.abrv,
    });
  };

  const handleUpdateVehicleMake = async (formData) => {
    await vehicleMakeStore.updateVehicleMake(
      vehicleMakeStore.editVehicleMake.id,
      {
        Name: formData.name,
        Abrv: formData.abrv,
      }
    );
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteVehicleMake = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle make?"
    );
    if (confirmed) {
      await vehicleMakeStore.deleteVehicleMake(id);
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const filteredVehicleMakes = vehicleMakeStore.vehicleMakes
    .filter(
      (make) =>
        make.Name.toLowerCase().includes(filterText.toLowerCase()) ||
        make.Abrv.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedVehicleMakes = filteredVehicleMakes.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div>
      <h1>Vehicle List Page</h1>
      {vehicleMakeStore.error && (
        <div style={{ color: "red" }}>{vehicleMakeStore.error}</div>
      )}

      {}
      <VehicleMakeForm
        onSubmit={
          vehicleMakeStore.editVehicleMake
            ? handleUpdateVehicleMake
            : handleAddVehicleMake
        }
        onCancel={() => vehicleMakeStore.setEditVehicleMake(null)}
        initialData={vehicleMakeStore.editVehicleMake}
        errors={{}}
      />

      {}
      <input
        type="text"
        placeholder="Filter by name or abbreviation"
        value={filterText}
        onChange={handleFilterChange}
      />
      <button onClick={() => handleSort("Name")}>Sort by Name</button>
      <button onClick={() => handleSort("Abrv")}>Sort by Abbreviation</button>

      <ul>
        {paginatedVehicleMakes.map((make) => (
          <li key={make.id}>
            {make.Name} ({make.Abrv})
            <button onClick={() => handleEditClick(make.id)}>Edit</button>
            <button onClick={() => handleDeleteVehicleMake(make.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        disabled={startIndex + pageSize >= filteredVehicleMakes.length}
      >
        Next
      </button>
    </div>
  );
});

export default VehicleListPage;
