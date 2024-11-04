import { makeObservable, observable, action } from "mobx";

class VehicleStore {
  vehicles = [];

  constructor() {
    makeObservable(this, {
      vehicles: observable,
      setVehicles: action,
    });
  }

  setVehicles(vehicles) {
    this.vehicles = vehicles;
  }
}

export default new VehicleStore();
