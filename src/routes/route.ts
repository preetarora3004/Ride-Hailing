import { Router } from "express";
import { Controller } from "../controller/controller";

const router = Router();
const controller = new Controller();

//allocate driverLocation

//find nearby drivers

router.get("/findDriver", controller.findNearByDriver);

//allocate driver

router.get("/allocateDriver", controller.allocateDriver);

export default router;
