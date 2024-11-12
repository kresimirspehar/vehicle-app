import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleModelService from "../services/VehicleModelService";

const VehicleModelEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modelData, setModelData] = useState({
    name: "",
    abrv: "",
    makeId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchModelData = async () => {
      const models = await VehicleModelService.readAll();
      const model = models.find((m) => m.id === id);
      if (model) {
        setModelData({
          name: model.Name,
          abrv: model.Abrv,
          makeId: model.MakeId,
        });
      } else {
        navigate("/models");
      }
    };
    fetchModelData();
  }, [id, navigate]);

  const validate = (data) => {
    const validationErrors = {};
    if (!data.name) validationErrors.name = "Name is required";
    if (!data.abrv) validationErrors.abrv = "Abbreviation is required";
    if (!data.makeId) validationErrors.makeId = "Make ID is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(modelData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await VehicleModelService.update(id, {
      Name: modelData.name,
      Abrv: modelData.abrv,
      MakeId: modelData.makeId,
    });
    navigate("/models");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModelData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Edit Vehicle Model</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={modelData.name}
          onChange={handleInputChange}
          placeholder="Model Name"
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

        <input
          type="text"
          name="abrv"
          value={modelData.abrv}
          onChange={handleInputChange}
          placeholder="Abbreviation"
        />
        {errors.abrv && <span style={{ color: "red" }}>{errors.abrv}</span>}

        <input
          type="text"
          name="makeId"
          value={modelData.makeId}
          onChange={handleInputChange}
          placeholder="Make ID"
        />
        {errors.makeId && <span style={{ color: "red" }}>{errors.makeId}</span>}

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/models")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default VehicleModelEditPage;
