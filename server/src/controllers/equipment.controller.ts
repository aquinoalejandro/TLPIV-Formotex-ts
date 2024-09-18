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
        const { nombre, descripcion,precio, estado, clienteDueño } = req.body;
        
        try {
            const equipment = await new EquipmentService().createEquipment( nombre, descripcion,precio, estado, clienteDueño);
            res.status(201).json(equipment);
            } catch (error) {
                
                console.log(error);
                res.status(500).json({ error: 'Error al crear el equipo' });
            }


    }

    async updateEquipment(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, descripcion, precio, estado, clienteDueño } = req.body;
        try {
            const equipment = await new EquipmentService().updateEquipment(id, nombre, descripcion,precio,estado, clienteDueño );
            res.status(200).json(`Se actualizo el equipo ${nombre}`);
            } catch (error) {
                res.status(500).json({ error: 'Error al actualizar el equipo' });
            }
    }

    async deleteEquipment(req: Request, res: Response) {
        const { id } = req.params;
        await new EquipmentService().deleteEquipment(id);
        res.status(204).json();
    }

}

