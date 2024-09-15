import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";
 
const app = Router();
const userController = new AuthController();


app.post("/auth/register", userController.registerUser);
app.post("/auth/login", userController.loginUser); 


export default app
