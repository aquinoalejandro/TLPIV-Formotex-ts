import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import bcryptjs from 'bcryptjs'


export class AuthController {

    async registerUser(req: Request, res: Response) {
        const { username, email, password, role } = req.body;
        const user = await new AuthService().createUser(username, email, password, role);
        res.json("Se ha registrado correctamente");

    }

    async loginUser(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await new AuthService().getUserByUsername(username);
        if (bcryptjs.compareSync(password, user.password)) {
            res.json("Se ha logueado correctamente, bienvenido");
        } else {    
            res.status(401).json({ message: 'Credenciales inválidas' });
        }      
    }
}
