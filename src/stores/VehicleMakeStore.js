import { makeObservable, observable, action, runInAction } from "mobx";
import VehicleMakeService from "../services/VehicleMakeService";

class VehicleMakeStore {
  vehicleMakes = [];
  editVehicleMake = null;
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      editVehicleMake: observable,
      loading: observable,
      error: observable,
      fetchVehicleMakes: action,
      addVehicleMake: action,
      updateVehicleMake: action,
      deleteVehicleMake: action,
      setEditVehicleMake: action,
      setVehicleMakes: action,
    });
  }

  setVehicleMakes(data) {
    this.vehicleMakes = data;
  }

  async fetchVehicleMakes() {
    this.loading = true;
    try {
      const data = await VehicleMakeService.readAll();
      runInAction(() => {
        this.setVehicleMakes(data);
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to fetch vehicle makes.";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async addVehicleMake(make) {
    try {
      await VehicleMakeService.create(make);
      await this.fetchVehicleMakes();
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to add vehicle make.";
      });
    }
  }

  async updateVehicleMake(id, updatedMake) {
    try {
      await VehicleMakeService.update(id, updatedMake);
      await this.fetchVehicleMakes();
      runInAction(() => {
        this.editVehicleMake = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to update vehicle make.";
      });
    }
  }

  async deleteVehicleMake(id) {
    try {
      await VehicleMakeService.delete(id);
      await this.fetchVehicleMakes();
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to delete vehicle make.";
      });
    }
  }

  setEditVehicleMake(make) {
    this.editVehicleMake = make;
  }
}

const vehicleMakeStore = new VehicleMakeStore();
export default vehicleMakeStore;
