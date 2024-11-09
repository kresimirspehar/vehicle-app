import React, { useState, useEffect } from "react";

const VehicleMakeForm = ({ onSubmit, onCancel, initialData = {}, errors }) => {
  const [formData, setFormData] = useState({ name: "", abrv: "" });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.Name || "",
        abrv: initialData.Abrv || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Vehicle Make Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors?.name && <span style={{ color: "red" }}>{errors.name}</span>}
      <input
        type="text"
        name="abrv"
        placeholder="Abbreviation"
        value={formData.abrv}
        onChange={handleChange}
      />
      {errors?.abrv && <span style={{ color: "red" }}>{errors.abrv}</span>}
      <button type="submit">{initialData ? "Save" : "Add Vehicle Make"}</button>
      {initialData && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default VehicleMakeForm;
