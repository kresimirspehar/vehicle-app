import React, { useState, useEffect } from "react";

const VehicleMakeForm = ({ onSubmit, onCancel, initialData = {}, errors }) => {
  const [formData, setFormData] = useState({ name: "", abrv: "" });
  const [validationErrors, setValidationErrors] = useState({});

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

  const validate = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.abrv) {
      errors.abrv = "Abbreviation is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    } else {
      setValidationErrors(errors);
    }
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
      {validationErrors.name && (
        <span style={{ color: "red" }}>{validationErrors.name}</span>
      )}

      <input
        type="text"
        name="abrv"
        placeholder="Abbreviation"
        value={formData.abrv}
        onChange={handleChange}
      />
      {validationErrors.abrv && (
        <span style={{ color: "red" }}>{validationErrors.abrv}</span>
      )}

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
