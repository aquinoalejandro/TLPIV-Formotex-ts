import { User } from "../models/user";

import bcryptjs from 'bcryptjs';

export class AuthService {

    async createUser(username: string, email: string, password: string, role: string): Promise<User> {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = bcryptjs.hashSync(password, 10);
        user.role = role;
        return user.save();
    }

    async getUsers(): Promise<User[]> {
        return User.findAll();
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await User.findByPk(id);
        if (!user) {
          return null;
        }
        return user;
      }        

      async updateUser(id: string, username: string, email: string, password: string, role: string): Promise<User | null> {
        const user = await this.getUserById(id);
        if (!user) {
          return null;
        }
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;
        return user.save();
      }

      async deleteUser(id: string): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) {
          throw new Error(`Usuario no encontrado con ID ${id}`);
        }
        await user.destroy();
      }

      async getUserByUsername(username: string): Promise<User> {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new Error(`Usuario no encontrado con nombre de usuario ${username}`);
        }
        return user;
      }
}

