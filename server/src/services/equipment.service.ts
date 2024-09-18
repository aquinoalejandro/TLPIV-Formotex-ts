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

      async createEquipment(nombre:string, imagen:string, descripcion:string, precio:number, stock:number): Promise<Equipment> {
        return Equipment.create({ nombre, imagen, descripcion,precio, stock });
      }


      async updateEquipment(id: string, nombre:string, imagen:string, descripcion:string, precio:number, stock:number): Promise<Equipment | null> {
        const equipmentToUpdate = await this.getEquipmentById(id);
        if (!equipmentToUpdate) {
          return null;
        }
        equipmentToUpdate.set({ nombre, imagen, descripcion,precio, stock });
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

