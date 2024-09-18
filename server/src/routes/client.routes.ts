
import { Router } from "express";
import { ClientController } from "../controllers/client.controller";

const app = Router();
const clientController = new ClientController();


app.post("/client/create", clientController.createClient);
app.get("/client", clientController.getClient);
app.get("/client/:id", clientController.getClientById);
app.put("/client/:id",  clientController.updateClient);
app.delete("/client/:id",   clientController.deleteClient);



export default app
