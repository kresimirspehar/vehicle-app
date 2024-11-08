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
    if (
      newVehicleModel.name &&
      newVehicleModel.abrv &&
      newVehicleModel.makeId
    ) {
      await VehicleModelService.create({
        Name: newVehicleModel.name,
        Abrv: newVehicleModel.abrv,
        MakeId: newVehicleModel.makeId,
      });
      const updatedModels = await VehicleModelService.readAll();
      setVehicleModels(updatedModels);
      setNewVehicleModel({ name: "", abrv: "", makeId: "" });
    }
  };

  const handleEditClick = (model) => {
    setEditVehicleModel(model);
  };

  const handleUpdateVehicleModel = async (e) => {
    e.preventDefault();
    if (editVehicleModel) {
      await VehicleModelService.update(editVehicleModel.id, {
        Name: editVehicleModel.Name,
        Abrv: editVehicleModel.Abrv,
        MakeId: editVehicleModel.MakeId,
      });
      const updatedModels = await VehicleModelService.readAll();
      setVehicleModels(updatedModels);
      setEditVehicleModel(null);
    }
  };

  const handleDeleteVehicleModel = async (id) => {
    await VehicleModelService.delete(id);
    const updatedModels = await VehicleModelService.readAll();
    setVehicleModels(updatedModels);
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
        <input
          type="text"
          name="abrv"
          placeholder="Abbreviation"
          value={
            editVehicleModel ? editVehicleModel.Abrv : newVehicleModel.abrv
          }
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="makeId"
          placeholder="Make ID"
          value={
            editVehicleModel ? editVehicleModel.MakeId : newVehicleModel.makeId
          }
          onChange={handleInputChange}
        />
        <button type="submit">
          {editVehicleModel ? "Save" : "Add Vehicle Model"}
        </button>
        {editVehicleModel && (
          <button onClick={() => setEditVehicleModel(null)}>Cancel</button>
        )}
      </form>
      <ul>
        {vehicleModels.map((model) => (
          <li key={model.id}>
            {model.Name} ({model.Abrv}) - Make ID: {model.MakeId}
            <button onClick={() => handleEditClick(model)}>Edit</button>
            <button onClick={() => handleDeleteVehicleModel(model.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleModelPage;
