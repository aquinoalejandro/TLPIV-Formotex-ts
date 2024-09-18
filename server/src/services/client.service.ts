import { Client } from "../models/client";


export class ClientService {

    async getClient(): Promise<Client[]> {
        return Client.findAll();
    }

    async getClientById(id: string): Promise<Client | null> {
        const client = await Client.findByPk(id);
        if (!client) {
            return null;
        }
        return client;
        }

    async createClient(
        nombre:string, nombreEmpresa:string, socioNombre:string, socioDni:string, email:string, domicilio:string): Promise<Client> {
        return Client.create({ nombre, nombreEmpresa, socioNombre, socioDni, email, domicilio});
    }

    async updateClient(id: string,nombre:string, nombreEmpresa:string, socioNombre:string, socioDni:string, email:string, domicilio:string): Promise<Client | null> {
        const ClientToUpdate = await this.getClientById(id);
        if (!ClientToUpdate) {
            return null;
        }
        ClientToUpdate.set({id });
        return ClientToUpdate.save();
    }

    async deleteClient(id: string): Promise<void> {
        const client = await this.getClientById(id);
        if (!client) {
            throw new Error(`Equipo no encontrado con ID ${id}`);
        }
        await client.destroy();
    }

}

