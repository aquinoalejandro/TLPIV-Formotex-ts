import { Request, Response } from "express";
import  {ClientService} from "../services/client.service";


export class ClientController {
    async getClient(req: Request, res: Response) {
        const Client = await new ClientService().getClient();
        res.status(200).json(Client);
    }

    async getClientById(req: Request, res: Response) {
        const { id } = req.params;
        const Client = await new ClientService().getClientById(id);
        res.status(200).json(Client);
    }

    async createClient(req: Request, res: Response) {
        const { nombre, nombreEmpresa, socioNombre, socioDni, email, domicilio } = req.body;
        
        try {
            const Client = await new ClientService().createClient( nombre, nombreEmpresa, socioNombre, socioDni, email, domicilio);
            res.status(201).json(Client);
            } catch (error) {
                
                console.log(error);
                res.status(500).json({ error: 'Error al crear el cliente' });
            }


    }

    async updateClient(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, nombreEmpresa, socioNombre, socioDni, email, domicilio } = req.body;
        const client = await new ClientService().updateClient(id ,nombre, nombreEmpresa, socioNombre, socioDni, email, domicilio );
        res.status(200).json(`Se actualizo el cliente ${nombre}`);
    }

    async deleteClient(req: Request, res: Response) {
        const { id } = req.params;
        await new ClientService().deleteClient(id);
        res.status(204).json();
    }

}

