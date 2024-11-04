import React, { useEffect, useState } from "react";
import VehicleMakeService from "../services/VehicleMakeService";

const VehicleListPage = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [newVehicleMake, setNewVehicleMake] = useState({ name: "", abrv: "" });
  const [editVehicleMake, setEditVehicleMake] = useState(null);

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
      <ul>
        {vehicleMakes.map((make) => (
          <li key={make.id}>
            {make.Name} ({make.Abrv})
            <button onClick={() => handleEditClick(make)}>Edit</button>
            <button onClick={() => handleDeleteVehicleMake(make.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleListPage;
