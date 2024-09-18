import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import bcryptjs from 'bcryptjs'
import { TokenService } from "../services/token.service";


export class AuthController {

    async registerUser(req: Request, res: Response) {
        const { username, email, password, role } = req.body;
        if (!role) {
            const role = 'user';
        }
        const user = await new AuthService().createUser(username, email, password, role);
        
        const token = new TokenService().generateToken(user);
        res.status(201).json({ token, role });
    }

    async loginUser(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await new AuthService().getUserByUsername(username);
        const role = user.role;
        console.log(role);
        if (bcryptjs.compareSync(password, user.password)) {
            const token = new TokenService().generateToken(user);
            res.status(200).json({ token, role });
        } else {    
            res.status(401).json({ message: 'Credenciales inválidas' });
        }      
    }
}
