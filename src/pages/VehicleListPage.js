import React, { useEffect, useState } from "react";
import VehicleMakeService from "../services/VehicleMakeService";

const VehicleListPage = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [newVehicleMake, setNewVehicleMake] = useState({ name: "", abrv: "" });

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      const data = await VehicleMakeService.readAll();
      setVehicleMakes(data);
    };

    fetchVehicleMakes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicleMake((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <div>
      <h1>Vehicle List Page</h1>
      <form onSubmit={handleAddVehicleMake}>
        <input
          type="text"
          name="name"
          placeholder="Vehicle Make Name"
          value={newVehicleMake.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="abrv"
          placeholder="Abbreviation"
          value={newVehicleMake.abrv}
          onChange={handleInputChange}
        />
        <button type="submit">Add Vehicle Make</button>
      </form>
      <ul>
        {vehicleMakes.map((make) => (
          <li key={make.id}>
            {make.Name} ({make.Abrv})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleListPage;
