import React, { useEffect, useState } from "react";
import VehicleMakeService from "../services/VehicleMakeService";
import VehicleMakeForm from "../components/VehicleMakeForm";

const VehicleListPage = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [editVehicleMake, setEditVehicleMake] = useState(null);
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      const data = await VehicleMakeService.readAll();
      setVehicleMakes(data);
    };

    fetchVehicleMakes();
  }, []);

  const validateMake = (make) => {
    const errors = {};
    if (!make.name) errors.name = "Name is required";
    if (!make.abrv) errors.abrv = "Abbreviation is required";
    return errors;
  };

  const handleAddVehicleMake = async (formData) => {
    const validationErrors = validateMake(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await VehicleMakeService.create({
      Name: formData.name,
      Abrv: formData.abrv,
    });
    const updatedMakes = await VehicleMakeService.readAll();
    setVehicleMakes(updatedMakes);
    setErrors({});
  };

  const handleUpdateVehicleMake = async (formData) => {
    const validationErrors = validateMake(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await VehicleMakeService.update(editVehicleMake.id, {
      Name: formData.name,
      Abrv: formData.abrv,
    });
    const updatedMakes = await VehicleMakeService.readAll();
    setVehicleMakes(updatedMakes);
    setEditVehicleMake(null);
    setErrors({});
  };

  const handleEditClick = (make) => {
    setEditVehicleMake(make);
  };

  const handleDeleteVehicleMake = async (id) => {
    await VehicleMakeService.delete(id);
    const updatedMakes = await VehicleMakeService.readAll();
    setVehicleMakes(updatedMakes);
  };

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

  return (
    <div>
      <h1>Vehicle List Page</h1>
      <VehicleMakeForm
        onSubmit={
          editVehicleMake ? handleUpdateVehicleMake : handleAddVehicleMake
        }
        onCancel={() => setEditVehicleMake(null)}
        initialData={editVehicleMake}
        errors={errors}
      />
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
