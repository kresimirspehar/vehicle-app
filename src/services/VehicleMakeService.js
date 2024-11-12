// VehicleMakeService.js
import BaseService from "./BaseService";

class VehicleMakeService extends BaseService {
  constructor() {
    super("VehicleMake");
  }
}

const vehicleMakeService = new VehicleMakeService();
export default vehicleMakeService;
