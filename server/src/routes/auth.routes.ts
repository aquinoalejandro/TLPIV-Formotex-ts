import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";
 
const app = Router();
const userController = new AuthController();


app.post("/auth/register", userController.registerUser);
app.get("/auth/login", userController.loginUser); 


export default app
