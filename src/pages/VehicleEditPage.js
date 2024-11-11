import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import vehicleMakeStore from "../stores/VehicleMakeStore";
import VehicleMakeForm from "../components/VehicleMakeForm";

const VehicleEditPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const vehicleMake = vehicleMakeStore.vehicleMakes.find(
      (make) => make.id === id
    );
    if (vehicleMake) {
      vehicleMakeStore.setEditVehicleMake(vehicleMake);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    await vehicleMakeStore.updateVehicleMake(id, {
      Name: formData.name,
      Abrv: formData.abrv,
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Vehicle Make</h1>
      <VehicleMakeForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
        initialData={vehicleMakeStore.editVehicleMake}
        errors={{}}
      />
    </div>
  );
});

export default VehicleEditPage;
