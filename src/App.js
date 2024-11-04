import React from "react";
import { Route, Routes } from "react-router-dom";
import VehicleListPage from "./pages/VehicleListPage";
import VehicleEditPage from "./pages/VehicleEditPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleListPage />} />
      <Route path="/edit/:id" element={<VehicleEditPage />} />
      <Route path="/create" element={<VehicleEditPage />} />
    </Routes>
  );
};

export default App;
