import { Equipment } from "../models/equipment";


export class EquipmentService {

    async getEquipment(): Promise<Equipment[]> {
        return Equipment.findAll();
    }

    async getEquipmentById(id: string): Promise<Equipment | null> {
        const equipment = await Equipment.findByPk(id);
        if (!equipment) {
          return null;
        }
        return equipment;
      }

      async createEquipment(nombre:string, descripcion:string, precio:number, estado:string, clienteDueño:string): Promise<Equipment> {
        return Equipment.create({ nombre, descripcion,precio, estado, clienteDueño });
      }


      async updateEquipment(id: string, nombre:string, descripcion:string, precio:number, estado:string, clienteDueño:string): Promise<Equipment | null> {
        const equipmentToUpdate = await this.getEquipmentById(id);
        if (!equipmentToUpdate) {
          return null;
        }
        equipmentToUpdate.set({ nombre, descripcion,precio, estado, clienteDueño });
        return equipmentToUpdate.save();
      }

      async deleteEquipment(id: string): Promise<void> {
        const equipment = await this.getEquipmentById(id);
        if (!equipment) {
          throw new Error(`Equipo no encontrado con ID ${id}`);
        }
        await equipment.destroy();
      }

}

