import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "equipamiento" })
export class Equipamiento extends Model {
    @Default(uuidv4)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
    })
    id: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nombre: string;


    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    descripcion: string;
}