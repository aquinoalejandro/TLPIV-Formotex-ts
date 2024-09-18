
import { Router } from "express";
import { EquipmentController } from "../controllers/equipment.controller";
 
const app = Router();
const equipmentController = new EquipmentController();


app.post("/equipment/create", equipmentController.createEquipment);
app.get("/equipment", equipmentController.getEquipment);
app.get("/equipment/:id", equipmentController.getEquipmentById);
app.put("/equipment/:id", equipmentController.updateEquipment);
app.delete("/equipment/:id", equipmentController.deleteEquipment);



export default app
