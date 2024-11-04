import React, { useEffect, useState } from "react";
import VehicleMakeService from "../services/VehicleMakeService";

const VehicleListPage = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      const data = await VehicleMakeService.readAll();
      setVehicleMakes(data);
    };

    fetchVehicleMakes();
  }, []);

  return (
    <div>
      <h1>Vehicle List Page</h1>
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
