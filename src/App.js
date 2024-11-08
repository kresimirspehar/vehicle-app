import React from "react";
import { Route, Routes } from "react-router-dom";
import VehicleListPage from "./pages/VehicleListPage";
import VehicleEditPage from "./pages/VehicleEditPage";
import VehicleModelPage from "./pages/VehicleModelPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleListPage />} />
      <Route path="/edit/:id" element={<VehicleEditPage />} />
      <Route path="/create" element={<VehicleEditPage />} />
      <Route path="/models" element={<VehicleModelPage />} />
    </Routes>
  );
};

export default App;
