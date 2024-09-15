import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "users" })
export class User extends Model {
    @Default(uuidv4)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
    })
    id: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    })
    role: string;

}
