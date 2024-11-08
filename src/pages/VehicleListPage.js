import React, { useEffect, useState } from "react";
import VehicleMakeService from "../services/VehicleMakeService";

const VehicleListPage = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [newVehicleMake, setNewVehicleMake] = useState({ name: "", abrv: "" });
  const [editVehicleMake, setEditVehicleMake] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      const data = await VehicleMakeService.readAll();
      setVehicleMakes(data);
    };

    fetchVehicleMakes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editVehicleMake) {
      setEditVehicleMake((prev) => ({
        ...prev,
        [name === "name" ? "Name" : "Abrv"]: value,
      }));
    } else {
      setNewVehicleMake((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddVehicleMake = async (e) => {
    e.preventDefault();
    if (newVehicleMake.name && newVehicleMake.abrv) {
      await VehicleMakeService.create({
        Name: newVehicleMake.name,
        Abrv: newVehicleMake.abrv,
      });
      const updatedMakes = await VehicleMakeService.readAll();
      setVehicleMakes(updatedMakes);
      setNewVehicleMake({ name: "", abrv: "" });
    }
  };

  const handleEditClick = (make) => {
    setEditVehicleMake(make);
  };

  const handleUpdateVehicleMake = async (e) => {
    e.preventDefault();
    if (editVehicleMake) {
      await VehicleMakeService.update(editVehicleMake.id, {
        Name: editVehicleMake.Name,
        Abrv: editVehicleMake.Abrv,
      });
      const updatedMakes = await VehicleMakeService.readAll();
      setVehicleMakes(updatedMakes);
      setEditVehicleMake(null);
    }
  };

  const handleDeleteVehicleMake = async (id) => {
    await VehicleMakeService.delete(id);
    const updatedMakes = await VehicleMakeService.readAll();
    setVehicleMakes(updatedMakes);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const filteredVehicleMakes = vehicleMakes
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Vehicle List Page</h1>
      <form
        onSubmit={
          editVehicleMake ? handleUpdateVehicleMake : handleAddVehicleMake
        }
      >
        <input
          type="text"
          name="name"
          placeholder="Vehicle Make Name"
          value={editVehicleMake ? editVehicleMake.Name : newVehicleMake.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="abrv"
          placeholder="Abbreviation"
          value={editVehicleMake ? editVehicleMake.Abrv : newVehicleMake.abrv}
          onChange={handleInputChange}
        />
        <button type="submit">
          {editVehicleMake ? "Save" : "Add Vehicle Make"}
        </button>
        {editVehicleMake && (
          <button onClick={() => setEditVehicleMake(null)}>Cancel</button>
        )}
      </form>

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
            <button onClick={() => handleEditClick(make)}>Edit</button>
            <button onClick={() => handleDeleteVehicleMake(make.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={startIndex + pageSize >= filteredVehicleMakes.length}
      >
        Next
      </button>
    </div>
  );
};

export default VehicleListPage;
