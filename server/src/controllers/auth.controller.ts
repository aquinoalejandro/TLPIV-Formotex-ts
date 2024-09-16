import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import bcryptjs from 'bcryptjs'
import { TokenService } from "../services/token.service";


export class AuthController {

    async registerUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        const role = 'user';
        const user = await new AuthService().createUser(username, email, password, role);
        
        const token = new TokenService().generateToken(user);
        res.status(201).json({ token });
    }

    async loginUser(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await new AuthService().getUserByUsername(username);
        if (bcryptjs.compareSync(password, user.password)) {
            const token = new TokenService().generateToken(user);
            res.status(200).json({ token });
        } else {    
            res.status(401).json({ message: 'Credenciales inválidas' });
        }      
    }
}
