import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "client" })
export class Client extends Model {
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
    nombreEmpresa: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 0
    })
    socioNombre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 0
    })
    socioDni: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 0
    })
    localidad: string;

}