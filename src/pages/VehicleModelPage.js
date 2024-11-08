import React, { useEffect, useState } from "react";
import VehicleModelService from "../services/VehicleModelService";

const VehicleModelPage = () => {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [newVehicleModel, setNewVehicleModel] = useState({
    name: "",
    abrv: "",
    makeId: "",
  });
  const [editVehicleModel, setEditVehicleModel] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchVehicleModels = async () => {
      const data = await VehicleModelService.readAll();
      setVehicleModels(data);
    };

    fetchVehicleModels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editVehicleModel) {
      setEditVehicleModel((prev) => ({
        ...prev,
        [name === "name" ? "Name" : name === "abrv" ? "Abrv" : "MakeId"]: value,
      }));
    } else {
      setNewVehicleModel((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddVehicleModel = async (e) => {
    e.preventDefault();
    const validationErrors = validateModel(newVehicleModel);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await VehicleModelService.create({
      Name: newVehicleModel.name,
      Abrv: newVehicleModel.abrv,
      MakeId: newVehicleModel.makeId,
    });
    const updatedModels = await VehicleModelService.readAll();
    setVehicleModels(updatedModels);
    setNewVehicleModel({ name: "", abrv: "", makeId: "" });
    setErrors({});
  };

  const handleEditClick = (model) => {
    setEditVehicleModel(model);
  };

  const handleUpdateVehicleModel = async (e) => {
    e.preventDefault();
    const validationErrors = validateModel(editVehicleModel);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await VehicleModelService.update(editVehicleModel.id, {
      Name: editVehicleModel.Name,
      Abrv: editVehicleModel.Abrv,
      MakeId: editVehicleModel.MakeId,
    });
    const updatedModels = await VehicleModelService.readAll();
    setVehicleModels(updatedModels);
    setEditVehicleModel(null);
    setErrors({});
  };

  const handleDeleteVehicleModel = async (id) => {
    await VehicleModelService.delete(id);
    const updatedModels = await VehicleModelService.readAll();
    setVehicleModels(updatedModels);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Filtriranje, sortiranje i paginacija podataka
  const filteredVehicleModels = vehicleModels
    .filter(
      (model) =>
        model.Name.toLowerCase().includes(filterText.toLowerCase()) ||
        model.Abrv.toLowerCase().includes(filterText.toLowerCase()) ||
        model.MakeId.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Paginacija
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedVehicleModels = filteredVehicleModels.slice(
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
    setCurrentPage(1); // Resetiraj na prvu stranicu kad korisnik unese filter
  };

  const validateModel = (model) => {
    const errors = {};
    if (!model.name) errors.name = "Name is required";
    if (!model.abrv) errors.abrv = "Abbreviation is required";
    if (!model.makeId) errors.makeId = "Make ID is required";
    return errors;
  };

  return (
    <div>
      <h1>Vehicle Model Page</h1>
      <form
        onSubmit={
          editVehicleModel ? handleUpdateVehicleModel : handleAddVehicleModel
        }
      >
        <input
          type="text"
          name="name"
          placeholder="Vehicle Model Name"
          value={
            editVehicleModel ? editVehicleModel.Name : newVehicleModel.name
          }
          onChange={handleInputChange}
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        <input
          type="text"
          name="abrv"
          placeholder="Abbreviation"
          value={
            editVehicleModel ? editVehicleModel.Abrv : newVehicleModel.abrv
          }
          onChange={handleInputChange}
        />
        {errors.abrv && <span style={{ color: "red" }}>{errors.abrv}</span>}
        <input
          type="text"
          name="makeId"
          placeholder="Make ID"
          value={
            editVehicleModel ? editVehicleModel.MakeId : newVehicleModel.makeId
          }
          onChange={handleInputChange}
        />
        {errors.makeId && <span style={{ color: "red" }}>{errors.makeId}</span>}
        <button type="submit">
          {editVehicleModel ? "Save" : "Add Vehicle Model"}
        </button>
        {editVehicleModel && (
          <button onClick={() => setEditVehicleModel(null)}>Cancel</button>
        )}
      </form>

      <input
        type="text"
        placeholder="Filter by name, abbreviation or Make ID"
        value={filterText}
        onChange={handleFilterChange}
      />

      <button onClick={() => handleSort("Name")}>Sort by Name</button>
      <button onClick={() => handleSort("Abrv")}>Sort by Abbreviation</button>
      <button onClick={() => handleSort("MakeId")}>Sort by Make ID</button>

      <ul>
        {paginatedVehicleModels.map((model) => (
          <li key={model.id}>
            {model.Name} ({model.Abrv}) - Make ID: {model.MakeId}
            <button onClick={() => handleEditClick(model)}>Edit</button>
            <button onClick={() => handleDeleteVehicleModel(model.id)}>
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
        disabled={startIndex + pageSize >= filteredVehicleModels.length}
      >
        Next
      </button>
    </div>
  );
};

export default VehicleModelPage;
