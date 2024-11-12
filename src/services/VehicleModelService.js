// VehicleModelService.js
import BaseService from "./BaseService";

class VehicleModelService extends BaseService {
  constructor() {
    super("VehicleModel");
  }
}

const vehicleModelService = new VehicleModelService();
export default vehicleModelService;
