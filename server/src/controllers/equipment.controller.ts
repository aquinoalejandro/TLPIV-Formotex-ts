import { Request, Response } from "express";
import  {EquipmentService} from "../services/equipment.service";


export class EquipmentController {
    async getEquipment(req: Request, res: Response) {
        const equipment = await new EquipmentService().getEquipment();
        res.status(200).json(equipment);
    }

    async getEquipmentById(req: Request, res: Response) {
        const { id } = req.params;
        const equipment = await new EquipmentService().getEquipmentById(id);
        res.status(200).json(equipment);
    }

    async createEquipment(req: Request, res: Response) {
        const { nombre, imagen, descripcion,precio, stock } = req.body;
        const equipment = new EquipmentService().createEquipment( nombre, imagen, descripcion, precio, stock);
        res.status(201).json("Se creo el equipo");
    }

    async updateEquipment(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, imagen, descripcion, precio, stock } = req.body;
        const equipment = await new EquipmentService().updateEquipment(id, nombre, imagen, descripcion, precio, stock );
        res.status(200).json("Se actualizo el equipo");
    }

    async deleteEquipment(req: Request, res: Response) {
        const { id } = req.params;
        await new EquipmentService().deleteEquipment(id);
        res.status(204).json();
    }

}

