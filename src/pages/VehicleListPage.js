import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import vehicleMakeStore from "../stores/VehicleMakeStore";
import VehicleMakeForm from "../components/VehicleMakeForm";
import VehicleMakeList from "../components/VehicleMakeList";
import { useNavigate } from "react-router-dom";

const VehicleListPage = observer(() => {
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [formResetKey, setFormResetKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  const handleAddVehicleMake = async (formData) => {
    await vehicleMakeStore.addVehicleMake({
      Name: formData.name,
      Abrv: formData.abrv,
    });
    setFormResetKey((prevKey) => prevKey + 1);
  };

  const handleUpdateVehicleMake = async (formData) => {
    await vehicleMakeStore.updateVehicleMake(
      vehicleMakeStore.editVehicleMake.id,
      { Name: formData.name, Abrv: formData.abrv }
    );
  };

  const handleEditClick = (id) => navigate(`/edit/${id}`);

  const handleDeleteVehicleMake = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle make?")) {
      await vehicleMakeStore.deleteVehicleMake(id);
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field, order) => {
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

  return (
    <div>
      <h1>Vehicle List Page</h1>
      {vehicleMakeStore.error && (
        <div style={{ color: "red" }}>{vehicleMakeStore.error}</div>
      )}

      <VehicleMakeForm
        key={formResetKey}
        onSubmit={
          vehicleMakeStore.editVehicleMake
            ? handleUpdateVehicleMake
            : handleAddVehicleMake
        }
        onCancel={() => vehicleMakeStore.setEditVehicleMake(null)}
        initialData={vehicleMakeStore.editVehicleMake}
        errors={{}}
      />

      <input
        type="text"
        placeholder="Filter by name or abbreviation"
        value={filterText}
        onChange={handleFilterChange}
      />

      <VehicleMakeList
        makes={filteredVehicleMakes}
        onEdit={handleEditClick}
        onDelete={handleDeleteVehicleMake}
        currentPage={currentPage}
        pageSize={pageSize}
        setPage={setCurrentPage}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <button onClick={() => navigate("/models")}>Go to Vehicle Models</button>
    </div>
  );
});

export default VehicleListPage;
